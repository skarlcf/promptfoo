import { existsSync, mkdirSync, writeFileSync } from 'fs';
import yaml from 'js-yaml';
import { homedir } from 'os';
import { join } from 'path';
import { getEnvString } from '../envars';
import type { UnifiedConfig } from '../types';
import { orderKeys } from './json';

let configDirectoryPath: string | undefined = getEnvString('PROMPTFOO_CONFIG_DIR');

export function getConfigDirectoryPath(createIfNotExists: boolean = false): string {
  const p = configDirectoryPath || join(homedir(), '.promptfoo');
  if (createIfNotExists && !existsSync(p)) {
    mkdirSync(p, { recursive: true });
  }
  return p;
}

export function setConfigDirectoryPath(newPath: string): void {
  configDirectoryPath = newPath;
}

export function writePromptfooConfig(config: Partial<UnifiedConfig>, outputPath: string) {
  const orderedConfig = orderKeys(config, [
    'description',
    'prompts',
    'providers',
    'redteam',
    'defaultTest',
    'tests',
    'scenarios',
  ]);
  writeFileSync(outputPath, yaml.dump(orderedConfig, { skipInvalid: true }));
}
