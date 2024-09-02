import { fetchWithCache, isCacheEnabled } from '../cache';
import { getEnvString } from '../envars';
import logger from '../logger';
import type { ApiProvider, ProviderEmbeddingResponse, ProviderResponse } from '../types';
import { REQUEST_TIMEOUT_MS, parseChatPrompt } from './shared';

interface OllamaCompletionOptions {
  // From https://github.com/jmorganca/ollama/blob/v0.1.0/api/types.go#L161
  embedding_only?: boolean;
  f16_kv?: boolean;
  frequency_penalty?: number;
  logits_all?: boolean;
  low_vram?: boolean;
  main_gpu?: number;
  mirostat_eta?: number;
  mirostat_tau?: number;
  mirostat?: number;
  num_batch?: number;
  num_ctx?: number;
  num_gpu?: number;
  num_gqa?: number;
  num_keep?: number;
  num_predict?: number;
  num_thread?: number;
  penalize_newline?: boolean;
  presence_penalty?: number;
  repeat_last_n?: number;
  repeat_penalty?: number;
  rope_frequency_base?: number;
  rope_frequency_scale?: number;
  seed?: number;
  stop?: string[];
  stream?: boolean;
  temperature?: number;
  tfs_z?: number;
  top_k?: number;
  top_p?: number;
  typical_p?: number;
  use_mlock?: boolean;
  use_mmap?: boolean;
  useNUMA?: boolean;
  vocab_only?: boolean;
}

const OllamaCompletionOptionKeys = new Set<keyof OllamaCompletionOptions>([
  'embedding_only',
  'f16_kv',
  'frequency_penalty',
  'logits_all',
  'low_vram',
  'main_gpu',
  'mirostat_eta',
  'mirostat_tau',
  'mirostat',
  'num_batch',
  'num_ctx',
  'num_gpu',
  'num_gqa',
  'num_keep',
  'num_predict',
  'num_thread',
  'penalize_newline',
  'presence_penalty',
  'repeat_last_n',
  'repeat_penalty',
  'rope_frequency_base',
  'rope_frequency_scale',
  'seed',
  'stop',
  'stream',
  'temperature',
  'tfs_z',
  'top_k',
  'top_p',
  'typical_p',
  'use_mlock',
  'use_mmap',
  'useNUMA',
  'vocab_only',
]);

interface OllamaCompletionJsonL {
  model: string;
  created_at: string;
  response?: string;
  done: boolean;
  context?: number[];

  total_duration?: number;
  load_duration?: number;
  sample_count?: number;
  sample_duration?: number;
  prompt_eval_count?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

interface OllamaChatJsonL {
  model: string;
  created_at: string;
  message?: {
    role: string;
    content: string;
    images: null;
  };
  done: boolean;

  total_duration?: number;
  load_duration?: number;
  sample_count?: number;
  sample_duration?: number;
  prompt_eval_count?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

export class OllamaCompletionProvider implements ApiProvider {
  modelName: string;
  config: OllamaCompletionOptions;

  constructor(modelName: string, options: { id?: string; config?: OllamaCompletionOptions } = {}) {
    const { id, config } = options;
    this.modelName = modelName;
    this.id = id ? () => id : this.id;
    this.config = config || {};
  }

  id(): string {
    return `ollama:completion:${this.modelName}`;
  }

  toString(): string {
    return `[Ollama Completion Provider ${this.modelName}]`;
  }

  async callApi(prompt: string): Promise<ProviderResponse> {
    const params = {
      model: this.modelName,
      prompt,
      stream: this.config.stream ?? false,
      options: Object.keys(this.config).reduce(
        (options, key) => {
          const optionName = key as keyof OllamaCompletionOptions;
          if (OllamaCompletionOptionKeys.has(optionName)) {
            options[optionName] = this.config[optionName];
          }
          return options;
        },
        {} as Partial<
          Record<keyof OllamaCompletionOptions, number | boolean | string[] | undefined>
        >,
      ),
    };

    logger.debug(`Calling Ollama API: ${JSON.stringify(params)}`);
    let responseData: string;
    let cached = false;
    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(getEnvString('OLLAMA_API_KEY')
            ? { Authorization: `Bearer ${getEnvString('OLLAMA_API_KEY')}` }
            : {}),
        },
        body: JSON.stringify(params),
      };

      if (isCacheEnabled()) {
        const cachedResponse = await fetchWithCache(
          `${getEnvString('OLLAMA_BASE_URL') || 'http://localhost:11434'}/api/generate`,
          fetchOptions,
          REQUEST_TIMEOUT_MS,
          'text',
        );
        responseData = cachedResponse.data;
        cached = cachedResponse.cached;
      } else {
        const response = await fetch(
          `${getEnvString('OLLAMA_BASE_URL') || 'http://localhost:11434'}/api/generate`,
          fetchOptions,
        );
        responseData = await response.text();
      }
    } catch (err) {
      return {
        error: `API call error: ${String(err)}`,
      };
    }
    logger.debug(`\tOllama generate API response: ${responseData}`);
    if (responseData.includes('"error":')) {
      const errorData = JSON.parse(responseData);
      return {
        error: `Ollama error: ${errorData.error}`,
      };
    }

    try {
      if (this.config.stream) {
        // If streaming, we need to parse multiple JSON lines
        let totalTokens = 0;
        const output = responseData
          .split('\n')
          .filter((line: string) => line.trim() !== '')
          .map((line: string) => {
            const parsed = JSON.parse(line) as OllamaCompletionJsonL;
            totalTokens += parsed.eval_count || 0;
            return parsed.response || '';
          })
          .join('');

        return {
          output,
          cached,
          tokenUsage: {
            total: totalTokens,
            prompt: 0, // Ollama doesn't provide separate prompt token count
            completion: totalTokens,
          },
        };
      } else {
        // If not streaming, the response is a single JSON object
        const parsed = JSON.parse(responseData) as OllamaCompletionJsonL;
        return {
          output: parsed.response || '',
          cached,
          tokenUsage: {
            total: parsed.eval_count || 0,
            prompt: 0, // Ollama doesn't provide separate prompt token count
            completion: parsed.eval_count || 0,
          },
        };
      }
    } catch (err) {
      return {
        error: `Ollama API response error: ${String(err)}: ${responseData}`,
      };
    }
  }
}

export class OllamaChatProvider implements ApiProvider {
  modelName: string;
  config: OllamaCompletionOptions;

  constructor(modelName: string, options: { id?: string; config?: OllamaCompletionOptions } = {}) {
    const { id, config } = options;
    this.modelName = modelName;
    this.id = id ? () => id : this.id;
    this.config = config || {};
  }

  id(): string {
    return `ollama:chat:${this.modelName}`;
  }

  toString(): string {
    return `[Ollama Chat Provider ${this.modelName}]`;
  }

  async callApi(prompt: string): Promise<ProviderResponse> {
    const messages = parseChatPrompt(prompt, [{ role: 'user', content: prompt }]);

    const params = {
      model: this.modelName,
      messages,
      stream: this.config.stream ?? false,
      options: Object.keys(this.config).reduce(
        (options, key) => {
          const optionName = key as keyof OllamaCompletionOptions;
          if (OllamaCompletionOptionKeys.has(optionName)) {
            options[optionName] = this.config[optionName];
          }
          return options;
        },
        {} as Partial<
          Record<keyof OllamaCompletionOptions, number | boolean | string[] | undefined>
        >,
      ),
    };

    logger.debug(`Calling Ollama API: ${JSON.stringify(params)}`);
    let responseData: string;
    let cached = false;
    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(getEnvString('OLLAMA_API_KEY')
            ? { Authorization: `Bearer ${getEnvString('OLLAMA_API_KEY')}` }
            : {}),
        },
        body: JSON.stringify(params),
      };

      if (isCacheEnabled()) {
        const cachedResponse = await fetchWithCache(
          `${getEnvString('OLLAMA_BASE_URL') || 'http://localhost:11434'}/api/chat`,
          fetchOptions,
          REQUEST_TIMEOUT_MS,
          'text',
        );
        responseData = cachedResponse.data;
        cached = cachedResponse.cached;
      } else {
        const response = await fetch(
          `${getEnvString('OLLAMA_BASE_URL') || 'http://localhost:11434'}/api/chat`,
          fetchOptions,
        );
        responseData = await response.text();
      }
    } catch (err) {
      return {
        error: `API call error: ${String(err)}`,
      };
    }
    logger.debug(`\tOllama generate API response: ${responseData}`);
    if (responseData.includes('"error":')) {
      const errorData = JSON.parse(responseData);
      return {
        error: `Ollama error: ${errorData.error}`,
      };
    }

    try {
      if (this.config.stream) {
        // If streaming, we need to parse multiple JSON lines
        let totalTokens = 0;
        const output = responseData
          .split('\n')
          .filter((line: string) => line.trim() !== '')
          .map((line: string) => {
            const parsed = JSON.parse(line) as OllamaChatJsonL;
            totalTokens += parsed.eval_count || 0;
            return parsed.message?.content || '';
          })
          .join('');

        return {
          output,
          cached,
          tokenUsage: {
            total: totalTokens,
            prompt: 0, // Ollama doesn't provide separate prompt token count
            completion: totalTokens,
          },
        };
      } else {
        // If not streaming, the response is a single JSON object
        const parsed = JSON.parse(responseData) as OllamaChatJsonL;
        return {
          output: parsed.message?.content || '',
          cached,
          tokenUsage: {
            total: parsed.eval_count || 0,
            prompt: 0, // Ollama doesn't provide separate prompt token count
            completion: parsed.eval_count || 0,
          },
        };
      }
    } catch (err) {
      return {
        error: `Ollama API response error: ${String(err)}: ${responseData}`,
      };
    }
  }
}

export class OllamaEmbeddingProvider extends OllamaCompletionProvider {
  async callEmbeddingApi(text: string): Promise<ProviderEmbeddingResponse> {
    const params = {
      model: this.modelName,
      prompt: text,
    };

    logger.debug(`Calling Ollama API: ${JSON.stringify(params)}`);
    let responseData: any;
    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(getEnvString('OLLAMA_API_KEY')
            ? { Authorization: `Bearer ${getEnvString('OLLAMA_API_KEY')}` }
            : {}),
        },
        body: JSON.stringify(params),
      };

      if (isCacheEnabled()) {
        const cachedResponse = await fetchWithCache(
          `${getEnvString('OLLAMA_BASE_URL') || 'http://localhost:11434'}/api/embeddings`,
          fetchOptions,
          REQUEST_TIMEOUT_MS,
          'json',
        );
        responseData = cachedResponse.data;
      } else {
        const response = await fetch(
          `${getEnvString('OLLAMA_BASE_URL') || 'http://localhost:11434'}/api/embeddings`,
          fetchOptions,
        );
        responseData = await response.json();
      }
    } catch (err) {
      return {
        error: `API call error: ${String(err)}`,
      };
    }
    logger.debug(`\tOllama embeddings API response: ${JSON.stringify(responseData)}`);

    try {
      const embedding = responseData.embedding as number[];
      if (!embedding) {
        throw new Error('No embedding found in Ollama embeddings API response');
      }
      return { embedding };
    } catch (err) {
      return {
        error: `API response error: ${String(err)}: ${JSON.stringify(responseData)}`,
      };
    }
  }
}
