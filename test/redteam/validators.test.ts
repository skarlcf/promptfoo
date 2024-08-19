import * as yaml from 'js-yaml';
import fs from 'node:fs';
import path from 'node:path';
import type { ZodError } from 'zod';
import {
  ALL_PLUGINS as REDTEAM_ALL_PLUGINS,
  ALL_STRATEGIES as REDTEAM_ALL_STRATEGIES,
  COLLECTIONS,
  DEFAULT_PLUGINS as REDTEAM_DEFAULT_PLUGINS,
  HARM_PLUGINS,
  PII_PLUGINS,
} from '../../src/redteam/constants';
import {
  RedteamConfigSchema,
  RedteamGenerateOptionsSchema,
  RedteamPluginSchema,
} from '../../src/validators/redteam';
import { transformCustomPlugin } from '../../src/validators/redteam';

jest.mock('node:fs', () => ({
  ...jest.requireActual('node:fs'),
  readFileSync: jest.fn(),
}));

jest.mock('../../src/esm', () => ({
  importModule: jest.fn(),
}));

jest.mock('../../src/cliState', () => ({
  basePath: '/mock/base/path',
}));

describe('RedteamGenerateOptionsSchema', () => {
  it('should accept valid options for a redteam test', () => {
    const input = {
      cache: true,
      config: 'promptfooconfig.yaml',
      defaultConfig: { temperature: 0.7 },
      injectVar: 'query',
      numTests: 50,
      output: 'sample-results.json',
      plugins: [{ id: 'harmful:hate' }],
      provider: 'openai:gpt-4',
      purpose: 'You are an expert content moderator',
      write: true,
    };
    expect(RedteamGenerateOptionsSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        data: {
          cache: true,
          config: 'promptfooconfig.yaml',
          defaultConfig: { temperature: 0.7 },
          injectVar: 'query',
          numTests: 50,
          output: 'sample-results.json',
          plugins: [{ id: 'harmful:hate', numTests: 5 }],
          provider: 'openai:gpt-4',
          purpose: 'You are an expert content moderator',
          write: true,
        },
        success: true,
      }),
    );
  });

  it('should reject invalid plugin names', () => {
    const input = {
      numTests: 10,
      plugins: ['harmful:medical'],
    };
    expect(RedteamGenerateOptionsSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        success: false,
      }),
    );
  });

  it('should require numTests to be a positive integer', () => {
    const input = {
      numTests: -5,
      plugins: ['harmful:hate'],
    };
    expect(RedteamGenerateOptionsSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        success: false,
      }),
    );
  });

  it('should accept addPlugins and addStrategies', () => {
    const input = {
      addPlugins: ['bfla'],
      addStrategies: ['base64'],
      cache: true,
      defaultConfig: {},
      numTests: 10,
      plugins: [{ id: 'harmful:hate' }],
      write: false,
    };
    expect(RedteamGenerateOptionsSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        data: expect.objectContaining({
          addPlugins: ['bfla'],
          addStrategies: ['base64'],
        }),
        success: true,
      }),
    );
  });

  it('should reject invalid addPlugins and addStrategies', () => {
    const input = {
      addPlugins: ['invalid-plugin'],
      addStrategies: ['invalid-strategy'],
      numTests: 10,
      plugins: ['harmful:hate'],
    };
    expect(RedteamGenerateOptionsSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        success: false,
      }),
    );
  });

  it('should accept valid defaultConfigPath', () => {
    const input = {
      cache: false,
      defaultConfig: {},
      defaultConfigPath: './config.json',
      numTests: 10,
      plugins: [{ id: 'harmful:hate' }],
      write: false,
    };
    expect(RedteamGenerateOptionsSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        data: expect.objectContaining({
          cache: false,
          defaultConfig: {},
          defaultConfigPath: './config.json',
          write: false,
        }),
        success: true,
      }),
    );
  });
});

describe('RedteamPluginSchema', () => {
  it('should accept a valid plugin name as a string', () => {
    expect(RedteamPluginSchema.safeParse('hijacking')).toEqual(
      expect.objectContaining({
        success: true,
      }),
    );
  });

  it('should accept a valid plugin object', () => {
    const input = {
      id: 'harmful:hate',
      numTests: 30,
    };
    expect(RedteamPluginSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        data: input,
        success: true,
      }),
    );
  });

  it('should reject an invalid plugin name', () => {
    expect(RedteamPluginSchema.safeParse('medical')).toEqual(
      expect.objectContaining({
        success: false,
      }),
    );
  });

  it('should reject a plugin object with negative numTests', () => {
    const input = {
      id: 'jailbreak',
      numTests: -10,
    };
    expect(RedteamPluginSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        success: false,
      }),
    );
  });

  it('should allow omitting numTests in a plugin object', () => {
    const input = {
      id: 'hijacking',
    };
    expect(RedteamPluginSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        data: {
          id: 'hijacking',
          numTests: expect.any(Number),
        },
        success: true,
      }),
    );
  });

  it('should accept a valid custom plugin object', () => {
    const input = {
      config: { key: 'value' },
      grader: 'Custom grader',
      id: 'custom-plugin',
      numTests: 5,
      template: 'Custom template',
    };
    expect(RedteamPluginSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        data: input,
        success: true,
      }),
    );
  });

  it('should reject an invalid custom plugin object', () => {
    const input = {
      id: 'custom-plugin',
      numTests: 5,
    };
    expect(RedteamPluginSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        success: false,
      }),
    );
  });
});

describe('RedteamConfigSchema', () => {
  it('should accept a valid configuration with all fields', () => {
    const input = {
      numTests: 3,
      plugins: [
        { id: 'harmful:non-violent-crime', numTests: 5 },
        { id: 'hijacking', numTests: 3 },
      ],
      purpose: 'You are a travel agent',
      strategies: ['prompt-injection'],
    };
    expect(RedteamConfigSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        data: {
          numTests: 3,
          plugins: [
            { id: 'harmful:non-violent-crime', numTests: 5 },
            { id: 'hijacking', numTests: 3 },
          ],
          purpose: 'You are a travel agent',
          strategies: [{ id: 'prompt-injection' }],
        },
        success: true,
      }),
    );
  });

  it('should use default values when fields are omitted', () => {
    const input = {};
    const result = RedteamConfigSchema.safeParse(input);
    expect(result.success).toBe(true);
    expect(result.success && result.data).toEqual({
      plugins: expect.arrayContaining(Array(REDTEAM_DEFAULT_PLUGINS.size).fill(expect.any(Object))),
      strategies: [{ id: 'jailbreak' }, { id: 'prompt-injection' }],
    });
  });

  it('should allow omitting the purpose field', () => {
    const input = { numTests: 10 };
    expect(RedteamConfigSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        data: {
          numTests: 10,
          plugins: expect.arrayContaining(
            Array(REDTEAM_DEFAULT_PLUGINS.size).fill(expect.any(Object)),
          ),
          strategies: [{ id: 'jailbreak' }, { id: 'prompt-injection' }],
        },
        success: true,
      }),
    );
  });

  it('should transform string plugins to objects', () => {
    const input = {
      plugins: ['hijacking', 'overreliance'],
    };
    expect(RedteamConfigSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        data: {
          numTests: undefined,
          plugins: [
            { id: 'hijacking', numTests: undefined },
            { id: 'overreliance', numTests: undefined },
          ],
          strategies: [{ id: 'jailbreak' }, { id: 'prompt-injection' }],
        },
        success: true,
      }),
    );
  });

  it('should use global numTests for plugins without specified numTests', () => {
    const input = {
      numTests: 7,
      plugins: [
        { id: 'harmful:non-violent-crime', numTests: 7 },
        { id: 'hijacking', numTests: 3 },
        { id: 'overreliance', numTests: 7 },
      ],
      strategies: ['jailbreak'],
    };
    expect(RedteamConfigSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        data: {
          numTests: 7,
          plugins: [
            { id: 'harmful:non-violent-crime', numTests: 7 },
            { id: 'hijacking', numTests: 3 },
            { id: 'overreliance', numTests: 7 },
          ],
          strategies: [{ id: 'jailbreak' }],
        },
        success: true,
      }),
    );
  });

  it('should reject invalid plugin names', () => {
    const input = {
      plugins: ['invalid-plugin-name'],
    };
    expect(RedteamConfigSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        success: false,
      }),
    );
  });

  it('should reject negative numTests', () => {
    const input = {
      numTests: -1,
    };
    expect(RedteamConfigSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        success: false,
      }),
    );
  });

  it('should reject non-integer numTests', () => {
    const input = {
      numTests: 3.5,
    };
    expect(RedteamConfigSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        success: false,
      }),
    );
  });

  it('should allow all valid plugin and strategy names', () => {
    const strategiesExceptDefault = REDTEAM_ALL_STRATEGIES.filter(
      (id) => id !== 'default' && id !== 'basic',
    );
    const input = {
      plugins: REDTEAM_ALL_PLUGINS,
      strategies: strategiesExceptDefault,
    };
    expect(RedteamConfigSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        data: {
          plugins: REDTEAM_ALL_PLUGINS.filter((id) => !COLLECTIONS.includes(id as any)).map(
            (id) => ({
              id,
              numTests: undefined,
            }),
          ),
          strategies: strategiesExceptDefault.map((id) => ({ id })),
        },
        success: true,
      }),
    );
  });

  it('should expand harmful plugin to all harm categories', () => {
    const input = {
      numTests: 3,
      plugins: ['harmful'],
    };
    expect(RedteamConfigSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        data: {
          numTests: 3,
          plugins: Object.keys(HARM_PLUGINS)
            .map((category) => ({
              id: category,
              numTests: 3,
            }))
            .sort((a, b) => a.id.localeCompare(b.id)),
          strategies: [{ id: 'jailbreak' }, { id: 'prompt-injection' }],
        },
        success: true,
      }),
    );
  });

  it('should allow overriding specific harm categories', () => {
    const input = {
      numTests: 3,
      plugins: [
        { id: 'harmful:hate', numTests: 10 },
        'harmful',
        { id: 'harmful:violent-crime', numTests: 5 },
      ],
    };
    const result = RedteamConfigSchema.safeParse(input);
    expect(result).toEqual(
      expect.objectContaining({
        data: {
          numTests: 3,
          plugins: expect.arrayContaining(
            [
              { id: 'harmful:hate', numTests: 10 },
              { id: 'harmful:violent-crime', numTests: 5 },
              ...Object.keys(HARM_PLUGINS)
                .filter((category) => !['harmful:hate', 'harmful:violent-crime'].includes(category))
                .map((category) => ({
                  id: category,
                  numTests: 3,
                })),
            ].sort((a: { id: string }, b: { id: string }) => a.id.localeCompare(b.id)),
          ),
          strategies: [{ id: 'jailbreak' }, { id: 'prompt-injection' }],
        },
        success: true,
      }),
    );
    expect(result?.data?.plugins).toHaveLength(Object.keys(HARM_PLUGINS).length);
  });

  it('should not duplicate harm categories when specified individually', () => {
    const input = {
      numTests: 3,
      plugins: ['harmful', 'harmful:hate', { id: 'harmful:violent-crime', numTests: 5 }],
    };
    expect(RedteamConfigSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        data: {
          numTests: 3,
          plugins: expect.arrayContaining([
            { id: 'harmful:hate', numTests: 3 },
            { id: 'harmful:violent-crime', numTests: 5 },
            ...Object.keys(HARM_PLUGINS)
              .filter((category) => !['harmful:hate', 'harmful:violent-crime'].includes(category))
              .map((category) => ({ id: category, numTests: 3 })),
          ]),
          strategies: [{ id: 'jailbreak' }, { id: 'prompt-injection' }],
        },
        success: true,
      }),
    );
  });

  it('should handle harmful categories without specifying harmful plugin', () => {
    const input = {
      numTests: 3,
      plugins: [{ id: 'harmful:hate', numTests: 10 }, 'harmful:violent-crime'],
    };
    const result = RedteamConfigSchema.safeParse(input);
    expect(result.success).toBe(true);
    expect(result.success && result.data).toEqual({
      numTests: 3,
      plugins: expect.arrayContaining([
        { id: 'harmful:hate', numTests: 10 },
        { id: 'harmful:violent-crime', numTests: 3 },
      ]),
      strategies: [{ id: 'jailbreak' }, { id: 'prompt-injection' }],
    });
  });

  it('should reject invalid harm categories', () => {
    const input = {
      plugins: ['harmful:invalid-category'],
    };
    const result = RedteamConfigSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('should accept an array of injectVar strings', () => {
    const input = {
      injectVar: 'system',
      plugins: ['harmful:insults'],
      strategies: ['jailbreak'],
    };
    const result = RedteamConfigSchema.safeParse(input);
    expect(result.success).toBe(true);
    expect(result.success && result.data).toEqual({
      injectVar: 'system',
      plugins: [{ id: 'harmful:insults', numTests: undefined }],
      strategies: [{ id: 'jailbreak' }],
    });
  });

  it('should accept a provider string', () => {
    const input = {
      plugins: ['overreliance'],
      provider: 'openai:gpt-3.5-turbo',
      strategies: ['jailbreak'],
    };
    expect(RedteamConfigSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        data: {
          plugins: [{ id: 'overreliance', numTests: undefined }],
          provider: 'openai:gpt-3.5-turbo',
          strategies: [{ id: 'jailbreak' }],
        },
        success: true,
      }),
    );
  });

  it('should accept a language string', () => {
    const input = {
      language: 'German',
      plugins: ['overreliance'],
      strategies: ['jailbreak'],
    };
    expect(RedteamConfigSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        data: {
          language: 'German',
          plugins: [{ config: undefined, id: 'overreliance', numTests: undefined }],
          strategies: [{ id: 'jailbreak' }],
        },
        success: true,
      }),
    );
  });

  it('should include injectVar, provider, and purpose when all are provided', () => {
    const input = {
      injectVar: 'system',
      plugins: ['overreliance', 'politics'],
      provider: 'openai:gpt-4',
      purpose: 'Test adversarial inputs',
    };
    expect(RedteamConfigSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        data: {
          injectVar: 'system',
          plugins: [
            { id: 'overreliance', numTests: undefined },
            { id: 'politics', numTests: undefined },
          ],
          provider: 'openai:gpt-4',
          purpose: 'Test adversarial inputs',
          strategies: [{ id: 'jailbreak' }, { id: 'prompt-injection' }],
        },
        success: true,
      }),
    );
  });

  it('should accept a provider object with id and config', () => {
    const input = {
      plugins: ['overreliance'],
      provider: {
        config: {
          max_tokens: 100,
          temperature: 0.7,
        },
        id: 'openai:gpt-4',
      },
      strategies: ['jailbreak'],
    };
    expect(RedteamConfigSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        data: {
          plugins: [{ id: 'overreliance', numTests: undefined }],
          provider: {
            config: {
              max_tokens: 100,
              temperature: 0.7,
            },
            id: 'openai:gpt-4',
          },
          strategies: [{ id: 'jailbreak' }],
        },
        success: true,
      }),
    );
  });

  it('should accept a provider object with callApi function', () => {
    const mockCallApi = jest.fn();
    const input = {
      plugins: ['overreliance'],
      provider: {
        callApi: mockCallApi,
        id: () => 'custom-provider',
        label: 'Custom Provider',
      },
      strategies: ['jailbreak'],
    };
    expect(RedteamConfigSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        data: {
          plugins: [{ id: 'overreliance', numTests: undefined }],
          provider: expect.objectContaining({
            callApi: expect.any(Function),
            id: expect.any(Function),
            label: 'Custom Provider',
          }),
          strategies: [{ id: 'jailbreak' }],
        },
        success: true,
      }),
    );
  });

  it('should reject an invalid provider', () => {
    const input = {
      plugins: ['overreliance'],
      provider: 123, // Invalid provider
      strategies: ['jailbreak'],
    };
    const result = RedteamConfigSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('should handle plugins with config attributes', () => {
    const input = {
      numTests: 2,
      plugins: [
        { config: { policy: 'Policy 1' }, id: 'policy', numTests: 5 },
        { config: { policy: 'Policy 2' }, id: 'policy', numTests: 3 },
        { id: 'harmful:hate', numTests: 10 },
        'harmful',
      ],
    };
    const result = RedteamConfigSchema.safeParse(input);
    expect(result.success).toBe(true);
    expect(result.success && result.data).toEqual({
      numTests: 2,
      plugins: [
        { id: 'harmful:hate', numTests: 10 },
        { config: { policy: 'Policy 1' }, id: 'policy', numTests: 5 },
        { config: { policy: 'Policy 2' }, id: 'policy', numTests: 3 },
        ...Object.keys(HARM_PLUGINS)
          .filter((category) => category !== 'harmful:hate')
          .map((category) => ({ id: category, numTests: 2 })),
      ].sort((a, b) => a.id.localeCompare(b.id)),
      strategies: [{ id: 'jailbreak' }, { id: 'prompt-injection' }],
    });
    expect(result.success && result.data.plugins).toHaveLength(
      Object.keys(HARM_PLUGINS).length + 2, // +2 for the two policy plugins
    );
  });

  it('should handle PII plugins with default numTests', () => {
    const input = {
      numTests: 5,
      plugins: [
        { id: 'pii', numTests: 7 },
        { id: 'pii:session', numTests: 3 },
      ],
    };
    const result = RedteamConfigSchema.safeParse(input);
    expect(result.success).toBe(true);
    expect(result.success && result.data).toBeDefined();
    const piiPlugins = result.success && result.data.plugins.filter((p) => p.id.startsWith('pii:'));
    expect(piiPlugins).toEqual(
      expect.arrayContaining([
        { id: 'pii:session', numTests: 3 },
        ...PII_PLUGINS.filter((id) => id !== 'pii:session').map((id) => ({ id, numTests: 7 })),
      ]),
    );
    expect(piiPlugins).toHaveLength(PII_PLUGINS.length);
  });

  it('should sort plugins with different configurations correctly', () => {
    const input = {
      plugins: [
        { config: { policy: 'Policy B' }, id: 'policy', numTests: 3 },
        { config: { policy: 'Policy A' }, id: 'policy', numTests: 5 },
        { id: 'hijacking', numTests: 2 },
      ],
    };
    expect(RedteamConfigSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        data: expect.objectContaining({
          plugins: [
            { id: 'hijacking', numTests: 2 },
            { config: { policy: 'Policy A' }, id: 'policy', numTests: 5 },
            { config: { policy: 'Policy B' }, id: 'policy', numTests: 3 },
          ],
        }),
        success: true,
      }),
    );
  });

  it('should handle custom plugins', () => {
    const input = {
      numTests: 10,
      plugins: [
        {
          config: { key: 'value' },
          grader: 'Custom grader',
          id: 'custom-plugin',
          numTests: 5,
          template: 'Custom template',
        },
        'harmful:hate',
      ],
    };
    expect(RedteamConfigSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        data: expect.objectContaining({
          plugins: expect.arrayContaining([
            {
              config: { key: 'value' },
              grader: 'Custom grader',
              id: 'custom-plugin',
              numTests: 5,
              template: 'Custom template',
            },
          ]),
        }),
        success: true,
      }),
    );
  });

  it('should handle the "default" plugin correctly', () => {
    const input = {
      numTests: 5,
      plugins: ['default'],
    };
    expect(RedteamConfigSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        data: expect.objectContaining({
          plugins: expect.arrayContaining([expect.objectContaining({ numTests: 5 })]),
        }),
        success: true,
      }),
    );
  });

  it('should handle the "basic" strategy correctly', () => {
    const input = {
      plugins: ['harmful:hate'],
      strategies: ['basic'],
    };
    const result = RedteamConfigSchema.safeParse(input);
    expect(result.success).toBe(true);
    expect(result.success && result.data.strategies).toEqual([]);
  });

  it('should handle provider object correctly', () => {
    const input = {
      plugins: ['harmful:hate'],
      provider: {
        config: {
          temperature: 0.7,
        },
        id: 'openai:gpt-4',
      },
    };
    expect(RedteamConfigSchema.safeParse(input)).toEqual(
      expect.objectContaining({
        data: expect.objectContaining({
          provider: {
            config: {
              temperature: 0.7,
            },
            id: 'openai:gpt-4',
          },
        }),
        success: true,
      }),
    );
  });
});

describe('transformCustomPlugin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should transform a JSON custom plugin', async () => {
    const mockPlugin = {
      grader: 'Custom JSON grader',
      id: 'custom-json-plugin',
      numTests: 5,
      template: 'Custom JSON template',
    };
    jest.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPlugin));

    const result = await transformCustomPlugin('file://custom-plugin.json');

    expect(result).toEqual(mockPlugin);
    expect(fs.readFileSync).toHaveBeenCalledWith(
      path.join('/mock/base/path', 'custom-plugin.json'),
      'utf-8',
    );
  });

  it('should transform a YAML custom plugin', async () => {
    const mockPlugin = {
      grader: 'Custom YAML grader',
      id: 'custom-yaml-plugin',
      numTests: 3,
      template: 'Custom YAML template',
    };
    jest.mocked(fs.readFileSync).mockReturnValue(yaml.dump(mockPlugin));

    const result = await transformCustomPlugin('file://custom-plugin.yaml');

    expect(result).toEqual(mockPlugin);
    expect(fs.readFileSync).toHaveBeenCalledWith(
      path.join('/mock/base/path', 'custom-plugin.yaml'),
      'utf-8',
    );
  });

  it('should transform a JavaScript custom plugin', async () => {
    const mockPlugin = {
      grader: 'Custom JS grader',
      id: 'custom-js-plugin',
      numTests: 7,
      template: 'Custom JS template',
    };

    jest.mocked(fs.readFileSync).mockReturnValue('// JavaScript content');
    const { importModule } = require('../../src/esm');
    importModule.mockResolvedValue(mockPlugin);

    const result = await transformCustomPlugin('file://custom-plugin.js');

    expect(result).toEqual(mockPlugin);
    expect(fs.readFileSync).toHaveBeenCalledWith(
      path.join('/mock/base/path', 'custom-plugin.js'),
      'utf-8',
    );
    expect(importModule).toHaveBeenCalledWith(path.join('/mock/base/path', 'custom-plugin.js'));
  });

  it('should throw an error for unsupported file types', async () => {
    jest.mocked(fs.readFileSync).mockReturnValue('Unsupported content');

    await expect(transformCustomPlugin('file://custom-plugin.txt')).rejects.toThrow(
      'Unsupported file type for custom plugin: custom-plugin.txt',
    );
  });

  it('should throw an error for invalid plugin data', async () => {
    jest.mocked(fs.readFileSync).mockReturnValue(
      JSON.stringify({
        // Missing required fields
        id: 'invalid-plugin',
      }),
    );
    let error: ZodError | undefined;

    try {
      await transformCustomPlugin('file://invalid-plugin.json');
    } catch (err) {
      error = err as ZodError;
    }
    expect(JSON.parse(error?.message ?? '{}')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'invalid_type',
          message: 'Required',
          path: ['template'],
        }),
        expect.objectContaining({
          code: 'invalid_type',
          message: 'Required',
          path: ['grader'],
        }),
      ]),
    );
  });
});
