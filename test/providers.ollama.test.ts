import { fetchWithCache, isCacheEnabled } from '../src/cache';
import { getEnvString } from '../src/envars';
import { loadApiProvider } from '../src/providers';
import {
  OllamaCompletionProvider,
  OllamaChatProvider,
  OllamaEmbeddingProvider,
} from '../src/providers/ollama';
import { REQUEST_TIMEOUT_MS } from '../src/providers/shared';

jest.mock('../src/cache');
jest.mock('../src/envars');
jest.mock('node-fetch');

describe('Ollama Providers', () => {
  const mockFetch = jest.fn();
  global.fetch = mockFetch as any;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(isCacheEnabled).mockReturnValue(false);
    jest.mocked(getEnvString).mockImplementation((key: string, defaultValue?: string): string => {
      if (key === 'OLLAMA_BASE_URL') {
        return 'http://localhost:11434';
      }
      if (key === 'OLLAMA_API_KEY') {
        return defaultValue || '';
      }
      return defaultValue || '';
    });
  });

  describe('OllamaCompletionProvider', () => {
    it('should handle non-streaming response correctly', async () => {
      const mockResponse = {
        text: jest.fn().mockResolvedValue(
          JSON.stringify({
            model: 'llama2:13b',
            created_at: '2023-08-08T21:50:41.695299Z',
            response: 'Great question! The sky appears blue',
            done: true,
            total_duration: 10411943458,
            load_duration: 458333,
            prompt_eval_count: 11,
            prompt_eval_duration: 3334582000,
            eval_count: 216,
            eval_duration: 6905134000,
          }),
        ),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const provider = new OllamaCompletionProvider('llama2:13b');
      const result = await provider.callApi('Why is the sky blue?');

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        output: 'Great question! The sky appears blue',
        cached: false,
        tokenUsage: {
          total: 227,
          prompt: 11,
          completion: 216,
        },
      });
    });

    it('should handle streaming response correctly', async () => {
      const mockResponse = {
        text: jest.fn().mockResolvedValue(
          `{"model":"llama2:13b","created_at":"2023-08-08T21:50:34.898068Z","response":"Great","done":false,"eval_count":1}
           {"model":"llama2:13b","created_at":"2023-08-08T21:50:34.929199Z","response":" question","done":false,"eval_count":2}
           {"model":"llama2:13b","created_at":"2023-08-08T21:50:34.959989Z","response":"!","done":false,"eval_count":1}
           {"model":"llama2:13b","created_at":"2023-08-08T21:50:35.023658Z","response":" The","done":false,"eval_count":1}
           {"model":"llama2:13b","created_at":"2023-08-08T21:50:35.0551Z","response":" sky","done":false,"eval_count":1}
           {"model":"llama2:13b","created_at":"2023-08-08T21:50:35.086103Z","response":" appears","done":false,"eval_count":1}
           {"model":"llama2:13b","created_at":"2023-08-08T21:50:35.117166Z","response":" blue","done":false,"eval_count":1}
           {"model":"llama2:13b","created_at":"2023-08-08T21:50:41.695299Z","response":"","done":true,"prompt_eval_count":5,"eval_count":0}`,
        ),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const provider = new OllamaCompletionProvider('llama2:13b', { config: { stream: true } });
      const result = await provider.callApi('Why is the sky blue?');

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        output: 'Great question! The sky appears blue',
        cached: false,
        tokenUsage: {
          total: 13,
          prompt: 5,
          completion: 8,
        },
      });
    });

    it('should handle API errors correctly', async () => {
      mockFetch.mockRejectedValue(new Error('API call failed'));

      const provider = new OllamaCompletionProvider('llama2:13b');
      const result = await provider.callApi('Why is the sky blue?');

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        error: 'API call error: Error: API call failed',
      });
    });
  });

  describe('OllamaChatProvider', () => {
    it('should handle non-streaming response correctly', async () => {
      const mockResponse = {
        text: jest.fn().mockResolvedValue(
          JSON.stringify({
            model: 'orca-mini',
            created_at: '2023-12-16T01:46:19.337165395Z',
            message: {
              role: 'assistant',
              content: 'Because of Rayleigh scattering.',
            },
            done: true,
            total_duration: 1486443841,
            load_duration: 1280794143,
            prompt_eval_count: 35,
            eval_count: 6,
          }),
        ),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const provider = new OllamaChatProvider('orca-mini');
      const result = await provider.callApi('Why is the sky blue?');

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        output: 'Because of Rayleigh scattering.',
        cached: false,
        tokenUsage: {
          total: 41,
          prompt: 35,
          completion: 6,
        },
      });
    });

    // Add streaming test for OllamaChatProvider similar to OllamaCompletionProvider
  });

  describe('OllamaEmbeddingProvider', () => {
    it('should handle embedding response correctly', async () => {
      const mockEmbedding = [0.1, 0.2, 0.3, 0.4, 0.5];
      const mockResponse = {
        json: jest.fn().mockResolvedValue({ embedding: mockEmbedding }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const provider = new OllamaEmbeddingProvider('llama2:13b');
      const result = await provider.callEmbeddingApi('Test text');

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        embedding: mockEmbedding,
      });
    });

    it('should handle API errors correctly', async () => {
      mockFetch.mockRejectedValue(new Error('API call failed'));

      const provider = new OllamaEmbeddingProvider('llama2:13b');
      const result = await provider.callEmbeddingApi('Test text');

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        error: 'API call error: Error: API call failed',
      });
    });
  });

  describe('Caching', () => {
    it('should use cache when enabled', async () => {
      jest.mocked(isCacheEnabled).mockReturnValue(true);
      jest.mocked(fetchWithCache).mockResolvedValue({
        data: JSON.stringify({
          model: 'llama2:13b',
          response: 'Cached response',
          done: true,
          prompt_eval_count: 10,
          eval_count: 5,
        }),
        cached: true,
      });

      const provider = new OllamaCompletionProvider('llama2:13b');
      const result = await provider.callApi('Cached prompt');

      expect(fetchWithCache).toHaveBeenCalledTimes(1);
      expect(fetchWithCache).toHaveBeenCalledWith(
        'http://localhost:11434/api/generate',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('"prompt":"Cached prompt"'),
        }),
        REQUEST_TIMEOUT_MS,
        'text',
      );
      expect(result).toEqual({
        output: 'Cached response',
        cached: true,
        tokenUsage: {
          cached: 15,
          total: 15,
        },
      });
    });
  });
});

describe('loadApiProvider', () => {
  it('loadApiProvider with ollama:modelName', async () => {
    const provider = await loadApiProvider('ollama:llama2:13b');
    expect(provider).toBeInstanceOf(OllamaCompletionProvider);
    expect(provider.id()).toBe('ollama:completion:llama2:13b');
  });

  it('loadApiProvider with ollama:completion:modelName', async () => {
    const provider = await loadApiProvider('ollama:completion:llama2:13b');
    expect(provider).toBeInstanceOf(OllamaCompletionProvider);
    expect(provider.id()).toBe('ollama:completion:llama2:13b');
  });

  it('loadApiProvider with ollama:embedding:modelName', async () => {
    const provider = await loadApiProvider('ollama:embedding:llama2:13b');
    expect(provider).toBeInstanceOf(OllamaEmbeddingProvider);
  });

  it('loadApiProvider with ollama:embeddings:modelName', async () => {
    const provider = await loadApiProvider('ollama:embeddings:llama2:13b');
    expect(provider).toBeInstanceOf(OllamaEmbeddingProvider);
  });

  it('loadApiProvider with ollama:chat:modelName', async () => {
    const provider = await loadApiProvider('ollama:chat:llama2:13b');
    expect(provider).toBeInstanceOf(OllamaChatProvider);
    expect(provider.id()).toBe('ollama:chat:llama2:13b');
  });
});
