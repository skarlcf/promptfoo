import path from 'path';
import type { UnifiedConfig } from '../../types';
import { maybeReadConfig } from './load';

const cache: Record<
  string,
  {
    defaultConfig: Partial<UnifiedConfig>;
    defaultConfigPath: string | undefined;
  }
> = {};

export async function loadDefaultConfig(dir: string | undefined): Promise<{
  defaultConfig: Partial<UnifiedConfig>;
  defaultConfigPath: string | undefined;
}> {

  const pwd = dir || process.cwd();

  if (pwd in cache) {
    return cache[pwd];
  }

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
  cache[pwd] = {
    defaultConfig,
    defaultConfigPath,
  };
  return cache[pwd];
}
