import path from 'path';
import type { UnifiedConfig } from '../../types';
import { maybeReadConfig } from './load';

export async function loadDefaultConfig(): Promise<{
  defaultConfig: Partial<UnifiedConfig>;
  defaultConfigPath: string | undefined;
}> {
  const pwd = process.cwd();
  let defaultConfig: Partial<UnifiedConfig> = {};
  let defaultConfigPath: string | undefined;

  // NOTE: sorted by frequency of use
  const extensions = ['yaml', 'yml', 'json', 'cjs', 'cts', 'js', 'mjs', 'mts', 'ts'];
  for (const ext of extensions) {
    const configPath = path.join(pwd, `promptfooconfig.${ext}`);
    const maybeConfig = await maybeReadConfig(configPath);
    if (maybeConfig) {
      defaultConfig = maybeConfig;
      defaultConfigPath = configPath;
      break;
    }
  }

  return { defaultConfig, defaultConfigPath };
}
