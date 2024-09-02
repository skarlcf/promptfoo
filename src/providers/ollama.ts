import { fetchWithCache, isCacheEnabled } from '../cache';
import { getEnvString } from '../envars';
import logger from '../logger';
import type { ApiProvider, ProviderEmbeddingResponse, ProviderResponse } from '../types';
import { REQUEST_TIMEOUT_MS, parseChatPrompt } from './shared';

interface OllamaCompletionOptions {
  // From https://github.com/jmorganca/ollama/blob/v0.1.0/api/types.go#L161
  num_predict?: number;
  top_k?: number;
  top_p?: number;
  tfs_z?: number;
  seed?: number;
  useNUMA?: boolean;
  num_ctx?: number;
  num_keep?: number;
  num_batch?: number;
  num_gqa?: number;
  num_gpu?: number;
  main_gpu?: number;
  low_vram?: boolean;
  f16_kv?: boolean;
  logits_all?: boolean;
  vocab_only?: boolean;
  use_mmap?: boolean;
  use_mlock?: boolean;
  embedding_only?: boolean;
  rope_frequency_base?: number;
  rope_frequency_scale?: number;
  typical_p?: number;
  repeat_last_n?: number;
  temperature?: number;
  repeat_penalty?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  mirostat?: number;
  mirostat_tau?: number;
  mirostat_eta?: number;
  penalize_newline?: boolean;
  stop?: string[];
  num_thread?: number;
}

const OllamaCompletionOptionKeys = new Set<keyof OllamaCompletionOptions>([
  'num_predict',
  'top_k',
  'top_p',
  'tfs_z',
  'seed',
  'useNUMA',
  'num_ctx',
  'num_keep',
  'num_batch',
  'num_gqa',
  'num_gpu',
  'main_gpu',
  'low_vram',
  'f16_kv',
  'logits_all',
  'vocab_only',
  'use_mmap',
  'use_mlock',
  'embedding_only',
  'rope_frequency_base',
  'rope_frequency_scale',
  'typical_p',
  'repeat_last_n',
  'temperature',
  'repeat_penalty',
  'presence_penalty',
  'frequency_penalty',
  'mirostat',
  'mirostat_tau',
  'mirostat_eta',
  'penalize_newline',
  'stop',
  'num_thread',
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
          'text'
        );
        responseData = cachedResponse.data;
        cached = cachedResponse.cached;
      } else {
        const response = await fetch(
          `${getEnvString('OLLAMA_BASE_URL') || 'http://localhost:11434'}/api/generate`,
          fetchOptions
        );
        responseData = await response.text();
        cached = false;
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
      const output = responseData
        .split('\n')
        .filter((line: string) => line.trim() !== '')
        .map((line: string) => {
          const parsed = JSON.parse(line) as OllamaCompletionJsonL;
          if (parsed.response) {
            return parsed.response;
          }
          return null;
        })
        .filter((s: string | null) => s !== null)
        .join('');

      return {
        output,
        cached,
      };
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
          'text'
        );
        responseData = cachedResponse.data;
        cached = cachedResponse.cached;
      } else {
        const response = await fetch(
          `${getEnvString('OLLAMA_BASE_URL') || 'http://localhost:11434'}/api/chat`,
          fetchOptions
        );
        responseData = await response.text();
        cached = false;
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
      const output = responseData
        .split('\n')
        .filter((line: string) => line.trim() !== '')
        .map((line: string) => {
          const parsed = JSON.parse(line) as OllamaChatJsonL;
          if (parsed.message?.content) {
            return parsed.message.content;
          }
          return null;
        })
        .filter((s: string | null) => s !== null)
        .join('');

      return {
        output,
        cached,
      };
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
          'json'
        );
        responseData = cachedResponse.data;
      } else {
        const response = await fetch(
          `${getEnvString('OLLAMA_BASE_URL') || 'http://localhost:11434'}/api/embeddings`,
          fetchOptions
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
