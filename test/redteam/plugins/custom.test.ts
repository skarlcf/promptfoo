import {
  CustomPlugin,
  CustomGrader,
  createCustomPlugin,
  createCustomGrader,
} from '../../../src/redteam/plugins/custom';
import type { ApiProvider } from '../../../src/types';

describe('CustomPlugin', () => {
  let provider: ApiProvider;
  let customConfig: any;

  beforeEach(() => {
    provider = {
      callApi: jest.fn().mockResolvedValue({ output: 'Test output' }),
      id: jest.fn().mockReturnValue('test-provider'),
    };
    customConfig = {
      id: 'test-custom',
      template: 'Custom template for {{ purpose }}',
      grader: 'Custom grader rubric',
    };
  });

  it('should create a CustomPlugin instance', () => {
    const plugin = new CustomPlugin(provider, 'test purpose', 'testVar', customConfig);
    expect(plugin).toBeInstanceOf(CustomPlugin);
  });

  it('should get the correct template', async () => {
    const plugin = new CustomPlugin(provider, 'test purpose', 'testVar', customConfig);
    const template = await plugin['getTemplate']();
    expect(template).toBe('Custom template for {{ purpose }}');
  });

  it('should get the correct assertions', () => {
    const plugin = new CustomPlugin(provider, 'test purpose', 'testVar', customConfig);
    const assertions = plugin['getAssertions']('test prompt');
    expect(assertions).toEqual([
      {
        type: 'promptfoo:redteam:custom',
        metric: 'test-custom',
      },
    ]);
  });
});

describe('CustomGrader', () => {
  const customConfig = {
    id: 'test-custom',
    template: 'Custom template',
    grader: 'Custom grader rubric',
    numTests: 1,
  };

  it('should create a CustomGrader instance', () => {
    const grader = new CustomGrader(customConfig);
    expect(grader).toBeInstanceOf(CustomGrader);
  });

  it('should have the correct id', () => {
    const grader = new CustomGrader(customConfig);
    expect(grader.id).toBe('promptfoo:redteam:custom:test-custom');
  });

  it('should have the correct rubric', () => {
    const grader = new CustomGrader(customConfig);
    expect(grader.rubric).toBe('Custom grader rubric');
  });
});

describe('createCustomPlugin', () => {
  it('should create a CustomPlugin instance', async () => {
    const mockPlugin = { id: 'test-custom', template: 'Test template', grader: 'Test grader' };
    const mockProvider = {} as ApiProvider;

    const result = await createCustomPlugin(mockPlugin, mockProvider, 'test purpose', 'testVar');
    expect(result).toBeInstanceOf(CustomPlugin);
  });

  it('should throw an error if plugin creation fails', async () => {
    const invalidPlugin = { id: 'test-custom' }; // Missing required fields
    const mockProvider = {} as ApiProvider;

    let error: Error | undefined;
    try {
      await createCustomPlugin(invalidPlugin, mockProvider, 'test purpose', 'testVar');
    } catch (e) {
      error = e as Error;
    }

    expect(error).toBeDefined();
    expect(error).toBeInstanceOf(Error);

    const parsedError = JSON.parse(error!.message);
    expect(parsedError).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'invalid_type',
          expected: 'string',
          message: 'Required',
          path: ['template'],
          received: 'undefined',
        }),
        expect.objectContaining({
          code: 'invalid_type',
          expected: 'string',
          message: 'Required',
          path: ['grader'],
          received: 'undefined',
        }),
      ]),
    );
  });
});

describe('createCustomGrader', () => {
  it('should create a CustomGrader instance', async () => {
    const mockPlugin = { id: 'test-custom', template: 'Test template', grader: 'Test grader' };

    const result = await createCustomGrader(mockPlugin);
    expect(result).toBeInstanceOf(CustomGrader);
  });

  it('should throw an error if grader creation fails', async () => {
    const invalidPlugin = { id: 'test-custom' }; // Missing required fields

    let error: Error | undefined;

    try {
      await createCustomGrader(invalidPlugin);
    } catch (err) {
      error = err as Error;
    }

    expect(error).toBeDefined();
    expect(error).toBeInstanceOf(Error);

    const parsedError = JSON.parse(error!.message);
    expect(parsedError).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'invalid_type',
          expected: 'string',
          message: 'Required',
          path: ['template'],
          received: 'undefined',
        }),
        expect.objectContaining({
          code: 'invalid_type',
          expected: 'string',
          message: 'Required',
          path: ['grader'],
          received: 'undefined',
        }),
      ]),
    );
  });
});
