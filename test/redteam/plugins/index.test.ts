import logger from '../../../src/logger';
import type { PluginKey } from '../../../src/redteam/plugins';
import { pluginRegistry, validatePlugins } from '../../../src/redteam/plugins';
import type { ApiProvider } from '../../../src/types';
import type { RedteamPluginObject } from '../../../src/types/redteam';

jest.mock('../../../src/logger');
jest.mock('../../../src/redteam/plugins/competitors', () => ({
  CompetitorsPlugin: class {
    constructor() {}
    generateTests() {
      return Promise.resolve([{ id: 'test' }]);
    }
  },
}));
jest.mock('../../../src/redteam/plugins/harmful', () => ({
  getHarmfulTests: jest.fn().mockResolvedValue([{ id: 'harmful-test' }]),
}));
jest.mock('../../../src/redteam/plugins/pii', () => ({
  getPiiLeakTestsForCategory: jest.fn().mockResolvedValue([{ id: 'pii-test' }]),
}));

describe('Plugin Registry', () => {
  it('should register core plugins', async () => {
    expect(pluginRegistry.has('competitors' as PluginKey)).toBeTruthy();

    const competitorsAction = pluginRegistry.get('competitors' as PluginKey);
    expect(competitorsAction).toBeDefined();

    expect(competitorsAction).toBeDefined();
    const result = await competitorsAction!({} as ApiProvider, 'purpose', 'injectVar', 1);
    expect(result).toEqual([{ id: 'test' }]);
  });

  it('should register harm plugins', async () => {
    expect(pluginRegistry.has('harmful:violent-crime' as PluginKey)).toBeTruthy();

    const harmfulAction = pluginRegistry.get('harmful:violent-crime' as PluginKey);
    expect(harmfulAction).toBeDefined();

    expect(harmfulAction).toBeDefined();
    const result = await harmfulAction!({} as ApiProvider, 'purpose', 'injectVar', 1);
    expect(result).toEqual([{ id: 'harmful-test' }]);
  });

  it('should register PII plugins', async () => {
    expect(pluginRegistry.has('pii:api-db' as PluginKey)).toBeTruthy();

    const piiAction = pluginRegistry.get('pii:api-db' as PluginKey);
    expect(piiAction).toBeDefined();

    expect(piiAction).toBeDefined();
    const result = await piiAction!({} as ApiProvider, 'purpose', 'injectVar', 1);
    expect(result).toEqual([{ id: 'pii-test' }]);
  });
});

describe('validatePlugins', () => {
  it('should not throw for valid plugins', () => {
    const validPlugins: RedteamPluginObject[] = [
      { id: 'competitors', numTests: 1 },
      { id: 'harmful:violent-crime', numTests: 2 },
      { id: 'pii:api-db', numTests: 3 },
    ];
    expect(() => validatePlugins(validPlugins)).not.toThrow();
  });

  it('should throw for invalid plugin ids', () => {
    const invalidPlugins: RedteamPluginObject[] = [{ id: 'invalid-plugin', numTests: 1 }];
    expect(() => validatePlugins(invalidPlugins)).toThrow('Invalid plugins detected');
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining('Invalid plugin(s): invalid-plugin'),
    );
  });

  it('should throw for invalid numTests', () => {
    const invalidPlugins: RedteamPluginObject[] = [
      { id: 'competitors', numTests: 0 },
      { id: 'harmful:violent-crime', numTests: -1 },
    ];
    expect(() => validatePlugins(invalidPlugins)).toThrow('Plugins without a valid numTests');
  });
});
