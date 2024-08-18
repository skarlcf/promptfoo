import { existsSync, readFileSync, writeFileSync } from 'fs';
import yaml from 'js-yaml';
import { readGlobalConfig, resetGlobalConfig, maybeRecordFirstRun } from '../src/globalConfig';

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
  statSync: jest.fn(),
  readdirSync: jest.fn(),
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
}));

jest.mock('proxy-agent', () => ({
  ProxyAgent: jest.fn().mockImplementation(() => ({})),
}));

jest.mock('glob', () => ({
  globSync: jest.fn(),
}));

jest.mock('../src/database');

describe('readCliConfig', () => {
  afterEach(() => {
    jest.clearAllMocks();
    resetGlobalConfig();
  });

  it('reads from existing config', () => {
    const config = { hasRun: false };
    jest.mocked(existsSync).mockReturnValue(true);
    jest.mocked(readFileSync).mockReturnValue(yaml.dump(config));

    const result = readGlobalConfig();

    expect(existsSync).toHaveBeenCalledTimes(1);
    expect(readFileSync).toHaveBeenCalledTimes(1);
    expect(result).toEqual(config);
  });

  it('creates new config if none exists', () => {
    jest.mocked(existsSync).mockReturnValue(false);
    jest.mocked(writeFileSync).mockImplementation();

    const result = readGlobalConfig();

    expect(existsSync).toHaveBeenCalledTimes(2);
    expect(writeFileSync).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ hasRun: false });
  });
});

describe('maybeRecordFirstRun', () => {
  afterEach(() => {
    resetGlobalConfig();
    jest.clearAllMocks();
  });

  it('returns true if it is the first run', () => {
    jest.mocked(existsSync).mockReturnValue(false);
    jest.mocked(writeFileSync).mockImplementation();

    const result = maybeRecordFirstRun();

    expect(writeFileSync).toHaveBeenCalledTimes(2);
    expect(result).toBe(true);
  });

  it('returns false if it is not the first run', () => {
    const config = { hasRun: true };
    jest.mocked(existsSync).mockReturnValue(true);
    jest.mocked(readFileSync).mockReturnValue(yaml.dump(config));

    const result = maybeRecordFirstRun();

    expect(readFileSync).toHaveBeenCalledTimes(1);
    expect(result).toBe(false);
  });
});
