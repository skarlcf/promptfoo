import { resolve } from 'path';

export function getDirectory() {
  return '/test/dir';
}

export function importModule(filePath: string, functionName?: string) {
  const mod = require(resolve(filePath));
  if (functionName) {
    return mod[functionName];
  }
  return mod;
}
