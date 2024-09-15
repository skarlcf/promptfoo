import * as path from 'path';

export function getDirectory(): string {
  return '/test/dir';
}

export function importModule(filePath: string, functionName?: string): any {
  const mod = require(path.resolve(filePath));
  if (functionName) {
    return mod[functionName];
  }
  return mod;
}
