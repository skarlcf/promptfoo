import chalk from 'chalk';
import dedent from 'dedent';
import logger from '../../logger';
import type { ApiProvider, TestCase } from '../../types';
import type { RedteamPluginObject } from '../../types/redteam';
import {
  HARM_PLUGINS,
  PII_PLUGINS,
  BASE_PLUGINS,
  ADDITIONAL_PLUGINS,
  CONFIG_REQUIRED_PLUGINS,
} from '../constants';

/**
 * Represents the key types for all plugins, including harm, PII, base, additional, and config-required plugins.
 */
export type PluginKey =
  | keyof typeof HARM_PLUGINS
  | (typeof PII_PLUGINS)[number]
  | (typeof BASE_PLUGINS)[number]
  | (typeof ADDITIONAL_PLUGINS)[number]
  | (typeof CONFIG_REQUIRED_PLUGINS)[number];

/**
 * Represents the action function signature for a plugin.
 * @param provider - The API provider.
 * @param purpose - The purpose of the test.
 * @param injectVar - The variable to inject.
 * @param n - The number of tests to generate.
 * @param config - Optional configuration for the plugin.
 * @returns A promise that resolves to an array of TestCases.
 */
type PluginAction = (
  provider: ApiProvider,
  purpose: string,
  injectVar: string,
  n: number,
  config?: Record<string, any>,
) => Promise<TestCase[]>;

/**
 * Registry to store all plugin actions.
 */
const pluginRegistry = new Map<PluginKey, PluginAction>();

/**
 * Registers a plugin with the given key and import path.
 * @param key - The key of the plugin.
 * @param importPath - The path to import the plugin from.
 */
const registerPlugin = (key: PluginKey, importPath: string) => {
  pluginRegistry.set(key, async (...args) => {
    const module = await import(importPath);
    const PluginClass =
      module[
        `${key.charAt(0).toUpperCase() + key.slice(1).replace(/-./g, (x) => x[1].toUpperCase())}Plugin`
      ];
    return new PluginClass(...args.slice(0, 3)).generateTests(args[3], args[4]);
  });
};

// Register core plugins
[...BASE_PLUGINS, ...ADDITIONAL_PLUGINS, ...CONFIG_REQUIRED_PLUGINS].forEach((key) =>
  registerPlugin(key, `./${key.toLowerCase()}`),
);

// Register harm and PII plugins
[...Object.keys(HARM_PLUGINS), ...PII_PLUGINS].forEach((key) =>
  pluginRegistry.set(key as PluginKey, async (...args) => {
    const { getHarmfulTests, getPiiLeakTestsForCategory } = await import(
      key.includes('pii') ? './pii' : './harmful'
    );
    return (key.includes('pii') ? getPiiLeakTestsForCategory : getHarmfulTests)(...args, [key]);
  }),
);

/**
 * Validates the given plugins.
 * @param plugins - An array of RedteamPluginObjects to validate.
 * @throws Error if any plugins are invalid or have invalid numTests.
 */
export const validatePlugins = (plugins: RedteamPluginObject[]): void => {
  const invalidPlugins = plugins.filter((p) => !pluginRegistry.has(p.id as PluginKey));
  if (invalidPlugins.length) {
    logger.error(dedent`Invalid plugin(s): ${invalidPlugins.map((p) => p.id).join(', ')}. 
      ${chalk.green(`Valid plugins are: ${Array.from(pluginRegistry.keys()).join(', ')}`)}`);
    throw new Error('Invalid plugins detected');
  }

  const invalidNumTests = plugins.filter(
    (p) => !Number.isSafeInteger(p.numTests) || (p.numTests ?? 0) <= 0,
  );
  if (invalidNumTests.length) {
    throw new Error(
      `Plugins without a valid numTests: ${invalidNumTests.map((p) => p.id).join(', ')}`,
    );
  }
};

/**
 * Exports the pluginRegistry for use in other modules.
 */
export { pluginRegistry };
