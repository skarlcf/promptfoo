---
sidebar_position: 41
---

# Ollama

The `ollama` provider is compatible with [Ollama](https://github.com/jmorganca/ollama), which enables access to a wide range of models including Llama, Mixtral, Mistral, and many more.

## Available Endpoints

### Completion API (`/api/generate`)

You can use the `/api/generate` endpoint by specifying any of the following providers from the [Ollama library](https://ollama.ai/library):

- `ollama:completion:llama3:text`
- `ollama:completion:llama2:text`
- `ollama:completion:llama2-uncensored`
- `ollama:completion:codellama`
- `ollama:completion:mistral`
- `ollama:completion:mixtral`
- `ollama:completion:phi`
- `ollama:completion:gemma`
- `ollama:completion:qwen`
- `ollama:completion:deepseek-coder`
- `ollama:completion:orca-mini`
- ... and many more

### Chat API (`/api/chat`)

Use the `/api/chat` endpoint for chat-formatted prompts:

- `ollama:chat:llama3`
- `ollama:chat:llama3:8b`
- `ollama:chat:llama3:70b`
- `ollama:chat:llama2`
- `ollama:chat:llama2:7b`
- `ollama:chat:llama2:13b`
- `ollama:chat:llama2:70b`
- `ollama:chat:mistral`
- `ollama:chat:mixtral:8x7b`
- `ollama:chat:mixtral:8x22b`
- `ollama:chat:gemma`
- `ollama:chat:phi`
- ... and many more

### Embeddings API (`/api/embeddings`)

We support the `/api/embeddings` endpoint via `ollama:embeddings:<model name>` for model-graded assertions such as [similarity](/docs/configuration/expected-outputs/similar/). Some popular embedding models include:

- `ollama:embeddings:nomic-embed-text`
- `ollama:embeddings:all-minilm`
- `ollama:embeddings:bge-large`

## Configuration

### Environment Variables

Supported environment variables:

- `OLLAMA_BASE_URL` - protocol, host name, and port (defaults to `http://localhost:11434`)
- `OLLAMA_API_KEY` - (optional) API key that is passed as the Bearer token in the Authorization Header when calling the API
- `REQUEST_TIMEOUT_MS` - request timeout in milliseconds

### Ollama-specific Options

To pass configuration options to Ollama, use the `config` key in your promptfoo configuration:

```yaml title=promptfooconfig.yaml
providers:
  - id: ollama:llama2
    config:
      num_predict: 1024
      temperature: 0.7
      top_k: 40
      top_p: 0.9
      stream: false
```

## Troubleshooting

### `localhost` and IPv4 vs IPv6

If you're experiencing `ECONNREFUSED` errors with Ollama API calls when using `localhost`, it might be due to an IPv4 vs IPv6 mismatch. Here are some solutions:

1. Use IPv6 addressing for Ollama:

   ```sh
   export OLLAMA_HOST=":11434"
   ```

   (Requires Ollama version 0.0.20 or newer)

2. Force promptfoo to use IPv4:

   ```sh
   export OLLAMA_BASE_URL="http://127.0.0.1:11434"
   ```

3. Update your OS's `hosts` file to bind `localhost` to IPv4.

## Performance Optimization

### Evaluating Models Serially

To conserve resources when evaluating multiple models, use the `-j 1` option:

```bash
promptfoo eval -j 1
```

This sets concurrency to 1, which:

1. Evaluates one provider at a time, then one prompt at a time.
2. Loads only one model into memory at a time.
3. Allows easy model swapping between evaluations.

This approach is useful for:

- Local setups with limited RAM
- Testing multiple resource-intensive models
- Debugging provider-specific issues
