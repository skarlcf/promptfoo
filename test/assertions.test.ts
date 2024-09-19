




















































































































































































































































































































































































































































                      x: { type: 'number' },
                      x: { type: 'number' },
                      y: { type: 'number' },
                      y: { type: 'number' },
                    },
                    },
                    properties: {
                    properties: {
                    required: ['x', 'y'],
                    required: ['x', 'y'],
                    type: 'object',
                    type: 'object',
                    x: { type: 'number' },
                    x: { type: 'number' },
                    y: { type: 'number' },
                    y: { type: 'number' },
                  },
                  },
                  },
                  },
                  name: 'add',
                  name: 'add',
                  parameters: {
                  parameters: {
                  properties: {
                  properties: {
                  required: ['x', 'y'],
                  required: ['x', 'y'],
                  type: 'object',
                  type: 'object',
                },
                },
                },
                },
                function: {
                function: {
                name: 'add',
                name: 'add',
                parameters: {
                parameters: {
                type: 'contains',
                type: 'contains',
                type: 'contains',
                type: 'equals',
                type: 'equals',
                type: 'equals',
                type: 'equals',
                type: 'equals',
                type: 'equals',
                type: 'function',
                type: 'function',
                value: 'Expected',
                value: 'Expected',
                value: 'Expected',
                value: 'Expected',
                value: 'Hello world',
                value: 'Hello world',
                value: 'Hello world',
                value: 'Something different',
                value: output,
                weight: 1,
                weight: 1,
                weight: 2,
                weight: 2,
              {
              {
              {
              {
              {
              {
              {
              {
              {
              {
              {
              {
              {
              },
              },
              },
              },
              },
              },
              },
              },
              },
              },
              },
              },
              },
              maximum: 180
              maximum: 90
              minimum: -180
              minimum: -90
              type: number
              type: number
            ],
            ],
            ],
            ],
            ],
            ],
            ],
            ],
            ],
            ],
            assert: [
            assert: [
            assert: [
            assert: [
            assert: [
            assert: [
            embedding: [0, 1, 0],
            embedding: [1, 0, 0],
            functions: [
            functions: [
            latitude:
            longitude:
            maximum: 180,
            maximum: 180,
            maximum: 180,
            maximum: 180,
            maximum: 90,
            maximum: 90,
            maximum: 90,
            maximum: 90,
            metric,
            minimum: -180,
            minimum: -180,
            minimum: -180,
            minimum: -180,
            minimum: -90,
            minimum: -90,
            minimum: -90,
            minimum: -90,
            threshold: 0.25,
            threshold: 0.5,
            threshold: 0.5,
            threshold: 100,
            tokenUsage: { total: 5, prompt: 2, completion: 3 },
            tokenUsage: { total: 5, prompt: 2, completion: 3 },
            tools: [
            tools: [
            type: 'assert-set',
            type: 'assert-set',
            type: 'assert-set',
            type: 'assert-set',
            type: 'assert-set',
            type: 'assert-set',
            type: 'contains',
            type: 'contains',
            type: 'equals',
            type: 'equals',
            type: 'equals',
            type: 'latency',
            type: 'latency',
            type: 'number',
            type: 'number',
            type: 'number',
            type: 'number',
            type: 'number',
            type: 'number',
            type: 'number',
            type: 'number',
            value: 'Hello world',
            value: 'Hello world',
            value: 'Nope',
            value: 'world',
            value: 'world',
            weight: 1,
            weight: 1,
            weight: 10,
            weight: 2,
            weight: 2,
            weight: 90,
          'JSON does not conform to the provided schema. Errors: data/latitude must be number',
          {
          {
          {
          {
          {
          {
          {
          {
          {
          {
          {
          },
          },
          },
          },
          },
          },
          },
          },
          },
          },
          },
          },
          },
          },
          },
          },
          },
          },
          },
          },
          },
          },
          },
          },
          },
          });
          });
          assertion,
          assertion,
          assertion,
          assertion,
          assertion,
          assertion,
          assertion,
          assertion,
          assertion: {
          assertion: {
          config: {
          config: {
          config: {
          config: {
          context: 'Paris is the capital of France.',
          context: 'Paris is the capital of France.',
          context: 'Paris is the capital of France.',
          context: 'Paris is the capital of France.',
          context: 'Paris is the capital of France.',
          format: 'date',
          format: 'date',
          headers: { 'Content-Type': 'application/json' },
          headers: { 'Content-Type': 'application/json' },
          headers: { 'Content-Type': 'application/json' },
          latencyMs: 50,
          latitude: {
          latitude: {
          latitude: {
          latitude: {
          longitude: {
          longitude: {
          longitude: {
          longitude: {
          maximum: 180,
          maximum: 180,
          maximum: 90,
          maximum: 90,
          minimum: -180,
          minimum: -180,
          minimum: -90,
          minimum: -90,
          pass: true,
          prompt: 'Generate XML',
          prompt: 'Some prompt that includes "double quotes" and \'single quotes\'',
          prompt: 'Some prompt',
          prompt: 'Some prompt',
          properties:
          provider,
          provider: 'replicate:moderation:foo/bar',
          provider: new OpenAiChatCompletionProvider('gpt-4'),
          provider: new OpenAiChatCompletionProvider('gpt-4'),
          providerResponse: { output },
          providerResponse: { output },
          providerResponse: { output },
          providerResponse: { output: 'Some output' },
          providerResponse: { output: 'Some output' },
          providerResponse: { output: 'Some output' },
          providerResponse: { output: 'Some output' },
          providerResponse: { output: 'Some output' },
          providerResponse: { output: 'Some output' },
          providerResponse: { output: { some: 'object' } },
          query: 'What is the capital of France?',
          query: 'What is the capital of France?',
          query: 'What is the capital of France?',
          query: 'What is the capital of France?',
          query: 'What is the capital of France?',
          reason: 'Assertion passed',
          required: ["latitude", "longitude"]
          requiredElements: ['root.element1', 'root.element2'],
          return Promise.resolve({
          return Promise.resolve({
          score: 0.5,
          status: 200,
          status: 200,
          status: 500,
          test,
          test,
          test,
          test,
          test,
          test,
          test,
          test: {} as AtomicTestCase,
          test: {} as AtomicTestCase,
          test: {} as AtomicTestCase,
          test: {},
          threshold: 0.001,
          threshold: 0.001,
          threshold: 0.2,
          threshold: 0.25,
          threshold: 0.5,
          threshold: 100,
          threshold: 100,
          threshold: 100,
          threshold: 100,
          threshold: 2,
          type: 'cost',
          type: 'cost',
          type: 'is-valid-openai-function-call',
          type: 'is-valid-openai-function-call',
          type: 'is-valid-openai-tools-call',
          type: 'is-valid-openai-tools-call',
          type: 'latency',
          type: 'latency',
          type: 'latency',
          type: 'latency',
          type: 'llm-rubric',
          type: 'moderation',
          type: 'number',
          type: 'number',
          type: 'number',
          type: 'number',
          type: 'perplexity-score',
          type: 'perplexity-score',
          type: 'perplexity',
          type: 'perplexity',
          type: 'similar',
          type: 'similar',
          type: 'similar',
          type: 'similar',
          type: 'string',
          type: 'string',
          type: object
          value: 'Different output',
          value: 'insert rubric here',
          value: 'Similar output',
          value: ['Different output 1', 'Different output 2'],
          value: ['Similar output 1', 'Different output 1'],
          vars: {},
        '<analysis><classification>T-shirt</classification><color>Red</color></analysis>',
        '<analysis><classification>T-shirt</classification><color>Red</color></analysis>';
        '<root><parent><child><grandchild>Content</grandchild></child></parent></root>';
        'analysis.classification',
        'analysis.classification',
        'analysis.color',
        'analysis.color',
        'analysis.confidence',
        'analysis.features',
        'analysis.reasoning',
        'analysis.style',
        'Before <analysis><classification>T-shirt</classification><color>Red</color></analysis> After';
        'Custom function returned false\noutput === "Expected output" && context.vars.foo === "something else"',
        'Expected output to contain all of [option1, option2, option3, option4]. Missing: [option4]',
        'JSON does not conform to the provided schema. Errors: data/date must match format "date"',
        'Latency assertion does not support cached results. Rerun the eval with --no-cache',
        'root.child',
        'root.emptyChild',
        'root.nonEmptyChild',
        'root.parent.child.grandchild',
        'root.parent.child.grandchild',
        'Start <root><parent><child><grandchild>Content</grandchild></child></parent></root> End';
        'This is a string with "double quotes"\n and \'single quotes\' \n\n and some \n\t newlines.';
        ['analysis.classification', 'analysis.color'],
        [metric]: 0.5,
        ],
        ],
        ],
        ],
        ],
        ],
        ],
        ],
        {
        {
        {
        { prompt: 'Some prompt', test: {}, vars: {} },
        { type: 'function', function: { arguments: '{"x": "foobar", "y": 20}', name: 'add' } },
        { type: 'function', function: { arguments: '{"x": 10, "y": 20}', name: 'add' } },
        }
        } else if (text.startsWith('Different output')) {
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        },
        };
        }),
        }),
        }),
        }),
        }),
        }),
        }),
        }),
        }),
        }),
        }),
        }),
        }),
        }),
        }),
        }),
        }),
        <classification>T-shirt/top</classification>
        <color>White with black print</color>
        <confidence>9</confidence>
        <features>Large circular graphic design on the front, resembling a smiley face or emoji</features>
        <reasoning>The image clearly shows a short-sleeved garment with a round neckline, which is characteristic of a T-shirt. The large circular graphic on the front is distinctive and appears to be a stylized smiley face or emoji design, which is popular in contemporary casual fashion. The stark contrast between the white fabric and black print is very clear, leaving little room for misinterpretation. The style is unmistakably modern and aligned with current trends in graphic tees. My confidence is high (9) because all elements of the image are clear and consistent with a typical graphic T-shirt design.</reasoning>
        <style>Modern, casual streetwear</style>
        assert: [
        assert: [
        assert: [
        assert: [
        assert: [
        assert: [
        assert: [
        assert: [
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion,
        assertion: {
        assertion: {
        assertion: {
        assertion: {
        assertion: {
        assertion: {
        assertion: {
        assertion: {
        assertion: {
        assertion: {
        assertion: {
        assertion: {
        assertion: {
        assertion: {
        assertion: {
        assertion: {
        assertion: {
        assertion: {
        assertion: fileAssertion,
        assertion: fileAssertion,
        assertion: pythonAssertion,
        callApi: jest.fn().mockResolvedValue({ cost }),
        callApi: jest.fn().mockResolvedValue({ cost }),
        callApi: jest.fn().mockResolvedValue({ logProbs }),
        callApi: jest.fn().mockResolvedValue({ logProbs }),
        callApi: jest.fn().mockResolvedValue({ logProbs }),
        callApi: jest.fn().mockResolvedValue({ logProbs }),
        date: {
        date: {
        if (text === 'Test output' || text.startsWith('Similar output')) {
        latencyMs: 0,
        latencyMs: 100,
        latencyMs: 1000,
        latencyMs: 50,
        latitude: {
        latitude: {
        longitude: {
        longitude: {
        new Error('The Python script `call_api` function must return a dict with an `output`'),
        new Response('', {
        new Response(JSON.stringify({ pass: false }), {
        new Response(JSON.stringify({ pass: true }), {
        output,
        output,
        pass: expectedPass,
        pass: expectedPass,
        pass: expectedPass,
        pass: false,
        pass: false,
        pass: false,
        pass: false,
        pass: false,
        pass: false,
        pass: false,
        pass: false,
        pass: false,
        pass: false,
        pass: false,
        pass: false,
        pass: false,
        pass: false,
        pass: false,
        pass: false,
        pass: false,
        pass: true,
        pass: true,
        pass: true,
        pass: true,
        pass: true,
        pass: true,
        pass: true,
        pass: true,
        pass: true,
        pass: true,
        pass: true,
        pass: true,
        pass: true,
        pass: true,
        pass: true,
        pass: true,
        pass: true,
        pass: true,
        pass: true,
        pass: true,
        pass: true,
        pass: true,
        pass: true,
        pass: true,
        pass: true,
        prompt,
        prompt,
        prompt,
        prompt,
        prompt,
        prompt,
        prompt: 'Generate non-XML',
        prompt: 'Generate text with multiple XML blocks',
        prompt: 'Generate text with nested XML',
        prompt: 'Generate text with specific XML',
        prompt: 'Generate text with specific XML',
        prompt: 'Generate text with XML',
        prompt: 'Generate text without XML',
        prompt: 'Generate text without XML',
        prompt: 'Generate text without XML',
        prompt: 'Generate XML',
        prompt: 'Generate XML',
        prompt: 'Generate XML',
        prompt: 'Generate XML',
        prompt: 'Generate XML',
        prompt: 'Generate XML',
        prompt: 'Generate XML',
        prompt: 'Some prompt that includes "double quotes" and \'single quotes\'',
        prompt: 'Some prompt',
        prompt: 'Some prompt',
        prompt: 'Some prompt',
        prompt: 'Some prompt',
        prompt: 'Some prompt',
        prompt: 'Some prompt',
        prompt: 'Some prompt',
        prompt: 'Some prompt',
        prompt: 'Some prompt',
        prompt: 'Some prompt',
        prompt: 'Some prompt',
        prompt: 'Some prompt',
        prompt: 'Some prompt',
        prompt: 'Some prompt',
        prompt: 'Some prompt',
        prompt: 'Some prompt',
        prompt: 'Some prompt',
        prompt: 'Some prompt',
        prompt: 'Some prompt',
        prompt: 'Some prompt',
        prompt: 'Some prompt',
        properties: {
        properties: {
        properties: {
        properties: {
        provider,
        provider,
        provider,
        provider,
        provider,
        provider,
        provider,
        provider,
        provider,
        provider,
        provider,
        provider,
        provider,
        provider,
        provider,
        provider,
        provider,
        provider,
        provider,
        provider,
        provider,
        provider,
        provider,
        provider,
        provider,
        provider,
        provider,
        provider,
        provider: BogusGrader,
        provider: new OpenAiChatCompletionProvider('foo', {
        provider: new OpenAiChatCompletionProvider('foo', {
        provider: new OpenAiChatCompletionProvider('foo', {
        provider: new OpenAiChatCompletionProvider('foo', {
        provider: new OpenAiChatCompletionProvider('gpt-4'),
        provider: new OpenAiChatCompletionProvider('gpt-4'),
        provider: new OpenAiChatCompletionProvider('gpt-4'),
        provider: new OpenAiChatCompletionProvider('gpt-4'),
        provider: new OpenAiChatCompletionProvider('gpt-4'),
        provider: new OpenAiChatCompletionProvider('gpt-4'),
        provider: new OpenAiChatCompletionProvider('gpt-4'),
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output },
        providerResponse: { output: 'Some output' },
        providerResponse: { output: 'Some output', cost },
        providerResponse: { output: 'Some output', cost },
        providerResponse: { output: 'Some output', logProbs },
        providerResponse: { output: 'Some output', logProbs },
        providerResponse: { output: 'Some output', logProbs },
        providerResponse: { output: 'Some output', logProbs },
        providerResponse: { output: 'The capital of France is Paris.' },
        reason:
        reason: 'Aggregate score 0.33 < 0.5 threshold',
        reason: 'All assertions passed',
        reason: 'All assertions passed',
        reason: 'Assertion failed',
        reason: 'Assertion passed',
        reason: 'Assertion passed',
        reason: 'Assertion passed',
        reason: 'Assertion passed',
        reason: 'Assertion passed',
        reason: 'Assertion passed',
        reason: 'Assertion passed',
        reason: 'Assertion passed',
        reason: 'Assertion passed',
        reason: 'Assertion passed',
        reason: 'Assertion passed',
        reason: 'Assertion passed',
        reason: 'Assertion passed',
        reason: 'Assertion passed',
        reason: 'Assertion passed',
        reason: 'Assertion passed',
        reason: 'Assertion passed',
        reason: 'Assertion passed',
        reason: 'Assertion passed',
        reason: 'Cost 0.0020 is greater than threshold 0.001',
        reason: 'Expected output "Something different" to equal "Expected output"',
        reason: 'Latency 1000ms is greater than threshold 100ms',
        reason: 'Mocked reason',
        reason: 'Mocked reason',
        reason: 'No valid XML content found matching the requirements',
        reason: 'No XML content found in the output',
        reason: 'None of the provided values met the similarity threshold',
        reason: 'Perplexity 1.28 is greater than threshold 0.2',
        reason: 'Perplexity score 0.44 is less than threshold 0.5',
        reason: 'Similarity 0.00 is less than threshold 0.75',
        reason: 'Similarity 1.00 is greater than threshold 0.75',
        reason: 'Similarity 1.00 is greater than threshold 0.75',
        reason: 'XML is missing required elements: analysis.color',
        reason: 'XML is valid and contains all required elements',
        reason: expect.stringContaining('Call to "add" does not match schema'),
        reason: expect.stringContaining('Call to "add" does not match schema'),
        reason: expect.stringContaining(expectedReason),
        reason: expect.stringContaining(expectedReason),
        reason: expect.stringMatching(/XML parsing failed/),
        reason: expect.stringMatching(expectedReason),
        required: ['latitude', 'longitude'],
        required: ['latitude', 'longitude'],
        required: ['latitude', 'longitude'],
        required: ['latitude', 'longitude'],
        resolvedValue = JSON.parse(returnValue as string);
        resolvedValue = returnValue;
        return 'BogusGrader';
        return {
        return Promise.reject(new Error('Unexpected input'));
        runAssertion({
        runAssertion({
        runAssertion({
        runAssertion({
        runAssertion({
        runAssertion({
        runAssertion({
        runAssertion({
        runAssertion({
        runAssertion({
        score: 0,
        score: 0,
        score: 0,
        score: 0,
        score: 0,
        score: 0,
        score: 1,
        score: 1,
        score: 1,
        score: 1,
        score: 1,
        score: 1,
        score: 1,
        score: 1,
        score: 1,
        score: 1,
        score: 1,
        score: 1,
        score: 1,
        score: expectedScore,
        test,
        test,
        test,
        test,
        test,
        test,
        test,
        test,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {} as AtomicTestCase,
        test: {},
        threshold,
        threshold: 0.25,
        threshold: 0.5,
        threshold: 0.7,
        threshold: 0.7,
        threshold: 0.7,
        threshold: 0.7,
        threshold: 0.7,
        threshold: 0.7,
        threshold: 0.7,
        threshold: 0.7,
        threshold: 0.7,
        throw new Error('Should not be called');
        type: 'contains-sql',
        type: 'contains-sql',
        type: 'contains-sql',
        type: 'contains-sql',
        type: 'contains-sql',
        type: 'contains-xml',
        type: 'contains-xml',
        type: 'contains-xml',
        type: 'contains-xml',
        type: 'contains-xml',
        type: 'context-faithfulness',
        type: 'context-faithfulness',
        type: 'context-faithfulness',
        type: 'context-faithfulness',
        type: 'context-faithfulness',
        type: 'context-relevance',
        type: 'context-relevance',
        type: 'context-relevance',
        type: 'context-relevance',
        type: 'equals',
        type: 'icontains-all',
        type: 'icontains-all',
        type: 'icontains-any',
        type: 'icontains-any',
        type: 'is-xml',
        type: 'is-xml',
        type: 'is-xml',
        type: 'is-xml',
        type: 'is-xml',
        type: 'javascript',
        type: 'object',
        type: 'object',
        type: 'object',
        type: 'object',
        type: 'python',
        type: 'python',
        type: 'python',
        value: 'analysis.classification,analysis.color',
        value: 'analysis.classification,analysis.color',
        value: 'analysis.classification,analysis.color',
        value: 'analysis.classification,analysis.color',
        value: 'Expected output',
        value: 'file:///path/to/assert.js',
        value: 'file:///path/to/assert.py',
        value: 'file:///path/to/assert.py',
        value: 'root.parent.child.grandchild',
        value: 'root.parent.child.grandchild',
        value: ['option1', 'option2', 'option3', 'option4'],
        value: ['option1', 'option2', 'option3'],
        value: ['option1', 'option2', 'option3'],
        value: ['option1', 'option2', 'option3'],
        value: ['root.element1', 'root.element2'],
        value: ['xml1', 'xml2'],
        value: {
        value: { invalidKey: ['root.element1', 'root.element2'] },
        value: returnValue.toString(),
        vars: {
        vars: {
        vars: {
        vars: {
        vars: {
        vars: {
        vars: {
        vars: {},
      .fn()
      .fn()
      .mocked(runPython)
      .mockRejectedValue(
      .mockResolvedValue({ flags: [] });
      .mockResolvedValue({ pass: true, score: 1, reason: 'Mocked reason' }),
      .mockResolvedValue({ pass: true, score: 1, reason: 'Mocked reason' }),
      .spyOn(ReplicateModerationProvider.prototype, 'callModerationApi')
      '{"pass": false, "score": 0, "reason": "Custom reason"}',
      '{"pass": true, "score": 1, "reason": "Custom reason"}',
      '<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="style.xsl"?><root><child>Content</child></root>';
      'Assertion passed',
      'Assertion passed',
      'boolean Promise',
      'boolean',
      'boolean',
      'Custom error',
      'Custom function returned false',
      'Custom reason',
      'Custom reason',
      'Custom reason',
      'Custom reason',
      'Custom success',
      'GradingResult',
      'GradingResult',
      'GradingResult',
      'GradingResult',
      'GradingResult',
      'GradingResult',
      'GradingResult',
      'Python score 0.4 is less than threshold 0.5',
      'This is a string with "double quotes"\n and \'single quotes\' \n\n and some \n\t newlines.';
      'this is some other stuff \n\n {"key": "value", "key2": {"key3": "value2", "key4": ["value3", "value4"]}} \n\n blah blah';
      'this is some other stuff \n\n {"key": "value", "key2": {"key3": "value2", "key4": ["value3", "value4"]}} another {"key": "value", "key2": {"key3": "value2", "key4": ["value3", "value4"]}}\n\n blah blah';
      ),
      ),
      ),
      ),
      );
      );
      ).rejects.toThrow(
      ).rejects.toThrow('context-faithfulness assertion type must have a context var');
      ).rejects.toThrow('context-faithfulness assertion type must have a query var');
      ).rejects.toThrow('context-faithfulness assertion type must have a string output');
      ).rejects.toThrow('context-faithfulness assertion type must have a vars object');
      ).rejects.toThrow('context-relevance assertion type must have a context var');
      ).rejects.toThrow('context-relevance assertion type must have a query var');
      ).rejects.toThrow('context-relevance assertion type must have a vars object');
      ).rejects.toThrow('Latency assertion must have a threshold in milliseconds');
      ).rejects.toThrow('xml assertion must contain a string, array value, or no value');
      ],
      ];
      ];
      ]),
      ]),
      ]),
      ]),
      ]),
      ]),
      ]);
      ]);
      {
      { prompt: 'Some prompt', test: {}, vars: {} },
      }
      }
      } as unknown as ApiProvider;
      } as unknown as ApiProvider;
      } as unknown as ApiProvider;
      } as unknown as ApiProvider;
      } as unknown as ApiProvider;
      } as unknown as ApiProvider;
      } else {
      },
      },
      },
      },
      },
      },
      },
      },
      },
      },
      },
      },
      },
      },
      },
      },
      },
      },
      },
      },
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };
      };`,
      }),
      }),
      }),
      }),
      }),
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      });
      // This score is less than the assertion threshold in the test
      `{"pass": false, "score": 0, "reason": "Custom error"}`,
      `{"pass": true, "score": 0.4, "reason": "Foo bar"}`,
      `{"pass": true, "score": 1, "reason": "Custom success"}`,
      </analysis>
      <analysis>
      0,
      0.4,
      0.5,
      1,
      allowedColumns: ['select::null::name', 'update::null::id'],
      allowedColumns: ['select::null::name', 'update::null::id'],
      allowedTables: ['(select|update|insert|delete)::null::departments'],
      allowedTables: ['(select|update|insert|delete)::null::departments'],
      assert: [
      assert: [assertion],
      assertion,
      assertion,
      assertion,
      assertion,
      assertion,
      assertion,
      assertion,
      assertion,
      assertion,
      assertion: {
      assertion: {
      assertion: {
      assertion: {
      assertion: {
      assertion: {
      assertion: {
      assertion: {
      assertion: {
      assertion: {
      assertion: { type: 'is-json', value: schemaWithFormat },
      assertion: { type: 'is-json', value: schemaWithFormat },
      assertion: containsAllAssertion,
      assertion: containsAllAssertion,
      assertion: containsAnyAssertion,
      assertion: containsAnyAssertion,
      assertion: containsJsonAssertion,
      assertion: containsJsonAssertion,
      assertion: containsJsonAssertion,
      assertion: containsJsonAssertion,
      assertion: containsJsonAssertionWithSchema,
      assertion: containsJsonAssertionWithSchema,
      assertion: containsJsonAssertionWithSchema,
      assertion: containsLowerAssertion,
      assertion: containsLowerAssertion,
      assertion: containsRegexAssertion,
      assertion: containsRegexAssertion,
      assertion: equalityAssertion,
      assertion: equalityAssertion,
      assertion: equalityAssertion,
      assertion: equalityAssertionWithObject,
      assertion: equalityAssertionWithObject,
      assertion: fileAssertion,
      assertion: fileAssertion,
      assertion: isJsonAssertion,
      assertion: isJsonAssertion,
      assertion: isJsonAssertionWithSchema,
      assertion: isJsonAssertionWithSchema,
      assertion: isJsonAssertionWithSchemaYamlString,
      assertion: isJsonAssertionWithSchemaYamlString,
      assertion: isSqlAssertion,
      assertion: isSqlAssertion,
      assertion: isSqlAssertionWithDatabase,
      assertion: isSqlAssertionWithDatabase,
      assertion: isSqlAssertionWithDatabaseAndBothList,
      assertion: isSqlAssertionWithDatabaseAndBothList,
      assertion: isSqlAssertionWithDatabaseAndBothList,
      assertion: isSqlAssertionWithDatabaseAndBothList,
      assertion: isSqlAssertionWithDatabaseAndWhiteColumnList,
      assertion: isSqlAssertionWithDatabaseAndWhiteColumnList,
      assertion: isSqlAssertionWithDatabaseAndWhiteTableList,
      assertion: isSqlAssertionWithDatabaseAndWhiteTableList,
      assertion: javascriptFunctionAssertion,
      assertion: javascriptFunctionFailAssertion,
      assertion: javascriptMultilineStringAssertion,
      assertion: javascriptMultilineStringAssertion,
      assertion: javascriptStringAssertion,
      assertion: javascriptStringAssertion,
      assertion: javascriptStringAssertionWithNumber,
      assertion: javascriptStringAssertionWithNumberAndThreshold,
      assertion: javascriptStringAssertionWithNumberAndThreshold,
      assertion: javascriptStringAssertionWithVars,
      assertion: javascriptStringAssertionWithVars,
      assertion: levenshteinAssertion,
      assertion: levenshteinAssertion,
      assertion: notContainsAssertion,
      assertion: notContainsAssertion,
      assertion: notContainsLowerAssertion,
      assertion: notContainsLowerAssertion,
      assertion: notContainsRegexAssertion,
      assertion: notContainsRegexAssertion,
      assertion: notEqualsAssertion,
      assertion: notEqualsAssertion,
      assertion: notIsSqlAssertion,
      assertion: notIsSqlAssertion,
      assertion: null,
      assertion: null,
      assertion: pythonAssertion,
      assertion: rougeNAssertion,
      assertion: rougeNAssertion,
      assertion: startsWithAssertion,
      assertion: startsWithAssertion,
      assertion: webhookAssertion,
      assertion: webhookAssertion,
      assertion: webhookAssertion,
      async callApi(): Promise<ProviderResponse> {
      await expect(
      await expect(
      await expect(
      await expect(
      await expect(
      await expect(
      await expect(
      await expect(
      await expect(
      await expect(
      callApi: jest.fn().mockResolvedValue({ cost: 0.001 }),
      callApi: jest.fn().mockResolvedValue({ cost: 0.001 }),
      const assertion: Assertion = {
      const assertion: Assertion = {
      const assertion: Assertion = {
      const assertion: Assertion = {
      const assertion: Assertion = {
      const assertion: Assertion = {
      const assertion: Assertion = {
      const assertion: Assertion = {
      const assertion: Assertion = {
      const assertion: Assertion = {
      const assertion: Assertion = {
      const assertion: Assertion = {
      const assertion: Assertion = {
      const assertion: Assertion = {
      const assertion: Assertion = {
      const assertion: Assertion = {
      const assertion: Assertion = {
      const assertion: Assertion = {
      const assertion: Assertion = {
      const assertion: Assertion = { type: 'contains-xml' };
      const assertion: Assertion = { type: 'contains-xml' };
      const assertion: Assertion = { type: 'is-xml' };
      const assertion: Assertion = { type: 'is-xml' };
      const assertion: Assertion = { type: 'not-contains-xml' };
      const assertion: Assertion = { type: 'not-contains-xml' };
      const assertion: Assertion = { type: 'not-is-xml' };
      const cost = 0.0005;
      const cost = 0.002;
      const fileAssertion: Assertion = {
      const fileAssertion: Assertion = {
      const logProbs = [-0.2, -0.4, -0.1, -0.3];
      const logProbs = [-0.2, -0.4, -0.1, -0.3];
      const logProbs = [-0.2, -0.4, -0.1, -0.3]; // Dummy logProbs for testing
      const logProbs = [-0.2, -0.4, -0.1, -0.3]; // Dummy logProbs for testing
      const metric = 'The best metric';
      const output =
      const output =
      const output =
      const output =
      const output =
      const output = '<analysis><classification>T-shirt</classification></analysis>';
      const output = '<root><child>Content</child></root';
      const output = '<root><child>Content</child></root>';
      const output = '<root><element1>Content1</element1><element2>Content2</element2></root>';
      const output = '<root><element1>Content1</element1><element2>Content2</element2></root>';
      const output = '<root><element1>Content1</element1><element2>Content2</element2></root>';
      const output = 'Before <analysis><classification>T-shirt</classification></analysis> After';
      const output = 'Expected output';
      const output = 'Expected output';
      const output = 'Expected output';
      const output = 'Expected output';
      const output = 'Expected output';
      const output = 'Expected output';
      const output = 'Expected output';
      const output = 'Expected output';
      const output = 'Expected output';
      const output = 'Expected output';
      const output = 'Expected output';
      const output = 'Expected output';
      const output = 'Expected output';
      const output = 'Expected';
      const output = 'Some text <xml1>content1</xml1> more text <xml2>content2</xml2>';
      const output = 'Some text before <root><child>Content</child></root> and after';
      const output = 'Some text with <xml>content</xml> in it';
      const output = 'Test output';
      const output = 'Test output';
      const output = 'Test output';
      const output = 'Test output';
      const output = 'This is just plain text without any XML';
      const output = 'This is just plain text without any XML';
      const output = 'This is not XML';
      const output = [
      const output = [
      const output = { arguments: '{"x": "10", "y": 20}', name: 'add' };
      const output = { arguments: '{"x": 10, "y": 20}', name: 'add' };
      const provider = {
      const provider = {
      const provider = {
      const provider = {
      const provider = {
      const provider = {
      const pythonAssertion: Assertion = {
      const result = await runAssertion({
      const result = await runAssertion({
      const result = await runAssertion({
      const result = await runAssertion({
      const result = await runAssertion({
      const result = await runAssertion({
      const result = await runAssertion({
      const result = await runAssertion({
      const result = await runAssertion({
      const result = await runAssertion({
      const result = await runAssertion({
      const result = await runAssertion({
      const result = await runAssertion({
      const result = await runAssertion({
      const result = await runAssertion({
      const result = await runAssertion({
      const result = await runAssertion({
      const result = await runAssertion({
      const result: GradingResult = await runAssertion({
      const result: GradingResult = await runAssertion({
      const result: GradingResult = await runAssertion({
      const result: GradingResult = await runAssertion({
      const result: GradingResult = await runAssertion({
      const result: GradingResult = await runAssertion({
      const result: GradingResult = await runAssertion({
      const result: GradingResult = await runAssertion({
      const result: GradingResult = await runAssertion({
      const result: GradingResult = await runAssertion({
      const result: GradingResult = await runAssertion({
      const result: GradingResult = await runAssertion({
      const result: GradingResult = await runAssertion({
      const result: GradingResult = await runAssertion({
      const result: GradingResult = await runAssertion({
      const result: GradingResult = await runAssertion({
      const result: GradingResult = await runAssertion({
      const result: GradingResult = await runAssertion({
      const result: GradingResult = await runAssertion({
      const result: GradingResult = await runAssertion({
      const result: GradingResult = await runAssertion({
      const result: GradingResult = await runAssertions({
      const result: GradingResult = await runAssertions({
      const result: GradingResult = await runAssertions({
      const result: GradingResult = await runAssertions({
      const result: GradingResult = await runAssertions({
      const result: GradingResult = await runAssertions({
      const test: AtomicTestCase = {
      const test: AtomicTestCase = {
      const test: AtomicTestCase = {
      const test: AtomicTestCase = {
      const test: AtomicTestCase = {
      const test: AtomicTestCase = {
      const test: AtomicTestCase = {
      const test: AtomicTestCase = {
      const test: AtomicTestCase = {
      const test: AtomicTestCase = {
      const test: AtomicTestCase = {
      const test: AtomicTestCase = {
      const test: AtomicTestCase = {
      const test: AtomicTestCase = {};
      const test: AtomicTestCase = {};
      databaseType: 'MySQL',
      databaseType: 'MySQL',
      databaseType: 'MySQL',
      databaseType: 'MySQL',
      expect.objectContaining({
      expect(mockFn).toHaveBeenCalledWith('Expected output', {
      expect(result.namedScores).toStrictEqual({
      expect(result.score).toBe(0.9);
      expect(result).toEqual({
      expect(result).toEqual({
      expect(result).toEqual({
      expect(result).toEqual({
      expect(result).toEqual({
      expect(result).toEqual({
      expect(result).toEqual({
      expect(result).toEqual({
      expect(result).toEqual({
      expect(result).toEqual({
      expect(result).toEqual({
      expect(result).toEqual({
      expect(result).toEqual({
      expect(result).toEqual({
      expect(result).toEqual({
      expect(result).toEqual({
      expect(result).toEqual({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(result).toMatchObject({
      expect(runPython).toHaveBeenCalledTimes(1);
      expect(runPython).toHaveBeenCalledWith(path.resolve('/path/to/assert.py'), 'get_assert', [
      expect(runPythonCode).toHaveBeenCalledTimes(1);
      expect(runPythonCode).toHaveBeenCalledWith(expect.anything(), 'main', [
      false,
      false,
      false,
      false,
      false,
      id(): string {
      if (output === "Expected output") {
      if (type === 'GradingResult') {
      isValid: false,
      isValid: false,
      isValid: false,
      isValid: false,
      isValid: false,
      isValid: true,
      isValid: true,
      isValid: true,
      isValid: true,
      isValid: true,
      isValid: true,
      isValid: true,
      isValid: true,
      isValid: true,
      isValid: true,
      isValid: true,
      jest.doMock(path.resolve('/path/to/assert.js'), () => mockFn, { virtual: true });
      jest.fn((output: string) => ({ pass: false, score: 0.1, reason: 'Custom reason' })),
      jest.fn((output: string) => ({ pass: true, score: 1, reason: 'Custom reason' })),
      jest.fn((output: string) => output !== 'Expected output'),
      jest.fn((output: string) => output === 'Expected output'),
      jest.fn((output: string) => Promise.resolve(true)),
      jest.mocked(runPython).mockResolvedValueOnce(pythonOutput as string | object);
      jest.mocked(runPythonCode).mockResolvedValueOnce(resolvedValue);
      jest.restoreAllMocks();
      jest.spyOn(DefaultEmbeddingProvider, 'callEmbeddingApi').mockImplementation((text) => {
      JSON.stringify({
      JSON.stringify({
      JSON.stringify({
      JSON.stringify({
      let resolvedValue;
      options: {
      output,
      output: JSON.stringify({ pass: true, score: 1.0, reason: 'I love you' }),
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: false,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      pass: true,
      Promise.resolve(
      Promise.resolve(
      Promise.resolve(
      prompt: 'foobar',
      prompt: 'Some prompt that includes "double quotes" and \'single quotes\'',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'Some prompt',
      prompt: 'variable value',
      properties: {
      properties: {
      properties: {
      properties: {
      provider,
      provider: Grader,
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      provider: new OpenAiChatCompletionProvider('gpt-4'),
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output },
      providerResponse: { output: 'Hi there world' },
      providerResponse: { output: 'Hi there world' },
      reason:
      reason:
      reason:
      reason: 'Aggregate score 0.33 < 0.5 threshold',
      reason: 'Aggregate score 0.33 ≥ 0.25 threshold',
      reason: 'All assertions passed',
      reason: 'Assertion failed',
      reason: 'Assertion failed',
      reason: 'Assertion failed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Assertion passed',
      reason: 'Custom function returned false\noutput === "Expected output"',
      reason: 'Expected output "{"key":"value"}" to equal "{"key": "not value"}"',
      reason: 'Expected output "{"key":"value"}" to equal "{"key":"not value"}"',
      reason: 'Expected output "Expected output" to equal "{"key":"value"}"',
      reason: 'Expected output "Expected output" to equal "{"key":"value"}"',
      reason: 'Expected output "Expected output" to equal "Different output"',
      reason: 'Expected output "Expected output" to equal "Different output"',
      reason: 'Expected output "Unexpected output" to not equal "Unexpected output"',
      reason: 'Expected output to be valid JSON',
      reason: 'Expected output to contain "expected output"',
      reason: 'Expected output to contain all of [option1, option2, option3]. Missing: [option3]',
      reason: 'Expected output to contain one of "option1, option2, option3"',
      reason: 'Expected output to contain one of "option1, option2, option3"',
      reason: 'Expected output to contain valid JSON',
      reason: 'Expected output to match regex "\\d{3}-\\d{2}-\\d{4}"',
      reason: 'Expected output to not contain "unexpected output"',
      reason: 'Expected output to not contain "Unexpected output"',
      reason: 'Expected output to not match regex "\\d{3}-\\d{2}-\\d{4}"',
      reason: 'Expected output to start with "Expected"',
      reason: 'JSON does not conform to the provided schema. Errors: data/latitude must be number',
      reason: 'JSON does not conform to the provided schema. Errors: data/latitude must be number',
      reason: 'JSON does not conform to the provided schema. Errors: data/latitude must be number',
      reason: 'JSON does not conform to the provided schema. Errors: data/latitude must be number',
      reason: 'Levenshtein distance 8 is greater than threshold 5',
      reason: 'No valid XML content found matching the requirements',
      reason: 'No XML content found in the output',
      reason: 'ROUGE-N score 0.17 is less than threshold 0.75',
      reason: 'ROUGE-N score 1.00 is greater than or equal to threshold 0.75',
      reason: 'SQL statement does not conform to the provided MySQL database syntax.',
      reason: 'SQL statement does not conform to the provided MySQL database syntax.',
      reason: 'Test grading output',
      reason: 'The output SQL statement is valid',
      reason: 'The Python script `call_api` function must return a dict with an `output`',
      reason: 'Webhook error: Webhook response status: 500',
      reason: 'Webhook returned false',
      reason: 'XML is missing required elements: analysis.color',
      reason: 'XML is missing required elements: root.parent.child.grandchild',
      reason: 'XML is valid and contains all required elements',
      reason: 'XML is valid and contains all required elements',
      reason: 'XML is valid and contains all required elements',
      reason: 'XML is valid and contains all required elements',
      reason: 'XML is valid and contains all required elements',
      reason: 'XML is valid and contains all required elements',
      reason: 'XML is valid and contains all required elements',
      reason: 'XML is valid and contains all required elements',
      reason: 'XML is valid and contains all required elements',
      reason: 'XML is valid and contains all required elements',
      reason: 'XML is valid and contains all required elements',
      reason: `SQL validation failed: authority = 'delete::null::employees' is required in table whiteList to execute SQL = 'DELETE FROM employees;'. SQL validation failed: authority = 'delete::employees::(.*)' is required in column whiteList to execute SQL = 'DELETE FROM employees;'.`,
      reason: `SQL validation failed: authority = 'insert::departments::name' is required in column whiteList to execute SQL = 'INSERT INTO departments (name) VALUES ('HR')'.`,
      reason: `SQL validation failed: authority = 'select::null::age' is required in column whiteList to execute SQL = 'SELECT age FROM a WHERE id = 1'.`,
      reason: `SQL validation failed: authority = 'update::null::a' is required in table whiteList to execute SQL = 'UPDATE a SET id = 1'.`,
      reason: `SQL validation failed: authority = 'update::null::employees' is required in table whiteList to execute SQL = 'UPDATE employees SET department_id = 2 WHERE employee_id = 1'.`,
      reason: expect.stringContaining('Custom function returned false'),
      reason: expect.stringContaining('Custom function returned false'),
      reason: expect.stringContaining('XML parsing failed'),
      required: ['date'],
      required: ['date'],
      required: ['latitude', 'longitude'],
      required: ['latitude', 'longitude'],
      return {
      score: 0,
      score: 0,
      score: 0.5,
      score: 0.5,
      score: 0.5,
      score: 0.5,
      score: Number(expectedPythonValue),
      score: output.length * 10,
      score: output.length * 10,
      score: output.length * 10,
      test,
      test,
      test,
      test,
      test,
      test: {
      test: {
      test: { vars: { foo: 'bar' } } as AtomicTestCase,
      test: { vars: { foo: 'bar' } } as AtomicTestCase,
      test: { vars: { foo: 'Expected output' } } as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {} as AtomicTestCase,
      test: {},
      true,
      true,
      true,
      true,
      true,
      type: 'contains-json',
      type: 'contains-json',
      type: 'equals',
      type: 'equals',
      type: 'equals',
      type: 'is-json',
      type: 'is-json',
      type: 'javascript',
      type: 'javascript',
      type: 'javascript',
      type: 'javascript',
      type: 'llm-rubric',
      type: 'object',
      type: 'object',
      type: 'object',
      type: 'object',
      type: 'python',
      type: 'python',
      undefined,
      undefined,
      validateXml(
      validateXml('<analysis><classification>T-shirt</classification></analysis>', [
      validateXml('<root xmlns:ns="http://example.com"><ns:child>Content</ns:child></root>'),
      validateXml('<root><!-- This is a comment --><child>Content</child></root>', ['root.child']),
      validateXml('<root><child><![CDATA[<p>This is CDATA content</p>]]></child></root>', [
      validateXml('<root><child>Content1</child><child>Content2</child></root>', ['root.child']),
      validateXml('<root><emptyChild></emptyChild><nonEmptyChild>Content</nonEmptyChild></root>', [
      validateXml('<root><parent><child></child></parent></root>', [
      validateXml('<root><parent><child><grandchild>Content</grandchild></child></parent></root>', [
      validateXml(xml, [
      value: '{{ foo }}',
      value: 'Expected output',
      value: 'file://./path/to/assert.js',
      value: 'file:///output.json',
      value: 'file:///output.json',
      value: 'file:///path/to/assert.py',
      value: 'file:///schema.json',
      value: 'file:///schema.json',
      value: 'file:///schema.json',
      value: 'file:///schema.json',
      value: 'output === "Expected output" && context.vars.foo === "bar"',
      value: 'output === "Expected output" && context.vars.foo === "something else"',
      value: 'output.length < 1',
      value: expectedPythonValue,
      vars: {},
    ...actual,
    ...actual,
    ...actual,
    ...actual,
    'should handle inline return type %s with return value: %p',
    'should handle when the file:// assertion with .py file returns a %s',
    'should pass when the file:// assertion with .js file returns a %s',
    );
    );
    );
    );
    );
    );
    );
    );
    ).toEqual({
    ).toEqual({
    ).toEqual({
    ).toEqual({
    ).toEqual({
    ).toEqual({
    ).toEqual({
    ).toEqual({
    ).toEqual({
    ).toEqual({
    [
    [
    [
    [
    [
    [
    [
    [
    [
    [
    ['boolean', 'False', false, 'Python code returned false'],
    ['boolean', 'True', true, 'Assertion passed'],
    ['boolean', false, 0, 'Python code returned false', false, undefined],
    ['boolean', true, 1, 'Assertion passed', true, undefined],
    ['boolean', true, true, 'Assertion passed'],
    ['number', '0.5', true, 'Assertion passed'],
    ['number', '0', false, 'Python code returned false'],
    ['number', 0, 0, 'Python code returned false', false, undefined],
    ['number', 0.5, true, 'Assertion passed'],
    ['number', 1, 1, 'Assertion passed', true, undefined],
    ['number', jest.fn((output: string) => 0), false, 'Custom function returned false'],
    ['number', jest.fn((output: string) => output.length), true, 'Assertion passed'],
    ],
    ],
    ],
    ],
    ],
    ],
    ],
    ],
    ],
    ],
    ],
    ]);
    } as unknown as ApiProvider;
    } as unknown as ApiProvider;
    },
    },
    },
    },
    },
    },
    },
    },
    },
    };
    };
    };
    };
    };
    };
    };
    };
    };
    };
    };
    };
    };
    };
    };
    };
    };
    };
    };
    }),
    }),
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    // Assertion grader passes
    // Expect test to pass because assertion grader takes priority
    // Test grader fails
    `;
    afterEach(() => {
    assert: [
    async (type, mockFn, expectedPass, expectedReason) => {
    async (type, pythonOutput, expectedPass, expectedReason) => {
    async (type, returnValue, expectedScore, expectedReason, expectedPass, threshold) => {
    beforeEach(() => {
    const ajv = createAjv();
    const ajv = createAjv();
    const ajv = createAjv();
    const assertion: Assertion = {
    const assertion: Assertion = {
    const assertion: Assertion = {
    const assertion: Assertion = {
    const assertion: Assertion = {
    const assertion: Assertion = {
    const assertion: Assertion = {
    const assertion: Assertion = {
    const assertion: Assertion = {
    const BogusGrader: ApiProvider = {
    const callApiSpy = jest.spyOn(DefaultGradingJsonProvider, 'callApi').mockResolvedValue({
    const callModerationApiSpy = jest
    const expectedPythonValue = '0.5';
    const fileAssertion: Assertion = {
    const fileAssertion: Assertion = {
    const input = '<root1>Content</root1> text <root2><child>More</child></root2>';
    const input = 'Some text <root><child>Content</child></root> more text';
    const input = 'Text <root><child>Content</child></root> more';
    const input = 'Text <root><child>Content</child></root> more';
    const input = 'This is just plain text';
    const javascriptStringAssertionWithVars: Assertion = {
    const javascriptStringAssertionWithVars: Assertion = {
    const mockFn = jest.fn((output: string) => output === 'Expected output');
    const output =
    const output =
    const output =
    const output = '';
    const output = '{"date": "2021-08-29"}';
    const output = '{"date": "not a date"}';
    const output = '{"key": "not value"}';
    const output = '{"key": "value"}';
    const output = '{"key": "value"}';
    const output = '{"latitude": "high", "longitude": [-1]}';
    const output = '{"latitude": "high", "longitude": [-1]}';
    const output = '{"latitude": "high", "longitude": [-1]}';
    const output = '{"latitude": 80.123, "longitude": -1}';
    const output = '{"latitude": 80.123, "longitude": -1}';
    const output = '{"latitude": 80.123, "longitude": -1}';
    const output = '```python\nprint("Hello, World!")\n```';
    const output = 'Different output';
    const output = 'Different output';
    const output = 'Different output';
    const output = 'Different output';
    const output = 'Different output';
    const output = 'Different output';
    const output = 'Different output';
    const output = 'Expected output';
    const output = 'Expected output';
    const output = 'Expected output';
    const output = 'Expected output';
    const output = 'Expected output';
    const output = 'Expected output';
    const output = 'Expected output';
    const output = 'Expected output';
    const output = 'Expected output';
    const output = 'Expected output';
    const output = 'Expected output';
    const output = 'Expected output';
    const output = 'Expected output';
    const output = 'Expected output';
    const output = 'Expected output';
    const output = 'Expected output';
    const output = 'Expected output';
    const output = 'Expected output';
    const output = 'Expected output';
    const output = 'Expected output';
    const output = 'Expected output';
    const output = 'Expected output';
    const output = 'EXPECTED OUTPUT';
    const output = 'here is the answer\n\n```{"latitude": "medium", "longitude": -1}```';
    const output = 'here is the answer\n\n```{"latitude": "medium", "longitude": -1}```';
    const output = 'here is the answer\n\n```{"latitude": 80.123, "longitude": -1}```';
    const output = 'here is the answer\n\n```{"latitude": 80.123, "longitude": -1}```';
    const output = 'here is the answer\n\n```{"latitude": 80.123, "longitude": -1}```';
    const output = 'Not the expected output';
    const output = 'Not valid JSON';
    const output = 'Not valid JSON';
    const output = 'nothin';
    const output = 'SELECT * FROM departments WHERE department_id = 1';
    const output = 'SELECT * FROM orders ORDERY BY order_date';
    const output = 'SELECT * FROM orders ORDERY BY order_date';
    const output = 'SELECT age FROM a WHERE id = 1';
    const output = 'SELECT id, name FROM users';
    const output = 'SELECT id, name FROM users';
    const output = 'SELECT id, name FROM users';
    const output = 'SELECT id, name FROM users';
    const output = 'SELECT name FROM departments';
    const output = 'SELECT name FROM t';
    const output = 'some different output';
    const output = 'Test output';
    const output = 'There is an extra opening bracket \n\n { {"key": "value"} \n\n blah blah';
    const output = 'This is the expected output.';
    const output = 'This output contains 123-45-6789';
    const output = 'This output contains 123-45-6789';
    const output = 'This output contains only option1 and option2';
    const output = 'This output contains option1, option2, and option3';
    const output = 'This output contains OPTION1, option2, and opTiOn3';
    const output = 'This output contains OPTION1, option2, and opTiOn3';
    const output = 'This output contains option1';
    const output = 'This output contains OPTION1';
    const output = 'This output does not contain any option';
    const output = 'This output does not contain any option';
    const output = 'This output does not contain the pattern';
    const output = 'This output does not contain the pattern';
    const output = 'Unexpected output';
    const output = 'Unexpected output';
    const output = 'UNEXPECTED OUTPUT';
    const output = 'UPDATE a SET id = 1';
    const output = 'UPDATE employees SET department_id = 2 WHERE employee_id = 1';
    const output = 'wassup\n```\nSELECT id, name FROM users\n```\nyolo';
    const output = 'wassup\n```sql\nSELECT id, name FROM users\n```\nyolo';
    const output = { key: 'not value' };
    const output = { key: 'value' };
    const output = { key: 'value' };
    const output = { key: 'value' };
    const output = `DELETE FROM employees;`;
    const output = `INSERT INTO departments (name) VALUES ('HR')`;
    const output = `SELECT first_name, last_name FROM employees WHERE first_name ILIKE 'john%'`;
    const prompt = 'Some prompt';
    const provider = {
    const provider = {
    const provider = new OpenAiChatCompletionProvider('gpt-4');
    const provider = new OpenAiChatCompletionProvider('gpt-4o-mini');
    const pythonAssertion: Assertion = {
    const result = containsXml(input, ['root.child']);
    const result = containsXml(input, ['root2.child']);
    const result = containsXml(input);
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertion({
    const result: GradingResult = await runAssertions({
    const result: GradingResult = await runAssertions({
    const result: GradingResult = await runAssertions({
    const result: GradingResult = await runAssertions({
    const result: GradingResult = await runAssertions({
    const result: GradingResult = await runAssertions({
    const schemaWithFormat = {
    const schemaWithFormat = {
    const test: AtomicTestCase = {
    const test: AtomicTestCase = {
    const xml =
    const xml = dedent`
    delete process.env.PROMPTFOO_DISABLE_AJV_STRICT_MODE;
    delete process.env.PROMPTFOO_DISABLE_AJV_STRICT_MODE;
    expect(
    expect(
    expect(
    expect(
    expect(
    expect(
    expect(
    expect(
    expect(
    expect(
    expect(ajv.formats).toBeDefined();
    expect(ajv.opts.strictSchema).toBe(false);
    expect(ajv.opts.strictSchema).toBe(true);
    expect(ajv).toBeDefined();
    expect(callApiSpy).toHaveBeenCalledTimes(1);
    expect(callModerationApiSpy).toHaveBeenCalledTimes(1);
    expect(containsXml(input, ['root.missing'])).toEqual({
    expect(containsXml(input)).toEqual({
    expect(fs.readFileSync).toHaveBeenCalledWith(path.resolve('/output.json'), 'utf8');
    expect(fs.readFileSync).toHaveBeenCalledWith(path.resolve('/output.json'), 'utf8');
    expect(fs.readFileSync).toHaveBeenCalledWith(path.resolve('/schema.json'), 'utf8');
    expect(fs.readFileSync).toHaveBeenCalledWith(path.resolve('/schema.json'), 'utf8');
    expect(fs.readFileSync).toHaveBeenCalledWith(path.resolve('/schema.json'), 'utf8');
    expect(fs.readFileSync).toHaveBeenCalledWith(path.resolve('/schema.json'), 'utf8');
    expect(mockFn).toHaveBeenCalledWith('Expected output', {
    expect(Object.keys(ajv.formats)).not.toHaveLength(0);
    expect(result.isValid).toBe(true);
    expect(result.isValid).toBe(true);
    expect(result.isValid).toBe(true);
    expect(result.pass).toBeTruthy();
    expect(result).toEqual(
    expect(result).toEqual({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(result).toMatchObject({
    expect(runPython).toHaveBeenCalledTimes(1);
    expect(runPythonCode).toHaveBeenCalledTimes(1);
    expect(runPythonCode).toHaveBeenCalledWith(expect.anything(), 'main', [
    expect(validateXml('<root><child id="1">Content</child></root>')).toEqual({
    expect(validateXml('<root><child>Content</child></root')).toEqual({
    expect(validateXml('<root><child>Content</child></root>')).toEqual({
    expect(validateXml(xml, ['root.child'])).toEqual({
    fetchWithRetries: jest.fn(actual.fetchWithRetries),
    it('assert-set failure', async () => {
    it('assert-set success', async () => {
    it('assert-set threshold failure', async () => {
    it('assert-set threshold success', async () => {
    it('assert-set with metric', async () => {
    it('should fail for a similar assertion with a string value', async () => {
    it('should fail for a similar assertion with an array of string values', async () => {
    it('should fail for an invalid function call with incorrect arguments', async () => {
    it('should fail for an invalid tools call with incorrect arguments', async () => {
    it('should fail inverse assertion when XML is present', async () => {
    it('should fail when required elements are missing in the XML', async () => {
    it('should fail when required elements are missing', async () => {
    it('should fail when the cost exceeds the threshold', async () => {
    it('should fail when the latency assertion fails', async () => {
    it('should fail when the output does not contain valid XML', async () => {
    it('should fail when the output is not valid XML', async () => {
    it('should fail when the perplexity assertion fails', async () => {
    it('should fail when the perplexity-score assertion fails', async () => {
    it('should handle inverse assertion correctly', async () => {
    it('should handle inverse assertion correctly', async () => {
    it('should handle latency equal to threshold', async () => {
    it('should handle multiple XML blocks in contains-xml assertion', async () => {
    it('should pass for a similar assertion with a string value', async () => {
    it('should pass for a similar assertion with an array of string values', async () => {
    it('should pass for a valid function call with correct arguments', async () => {
    it('should pass for a valid tools call with correct arguments', async () => {
    it('should pass when all required vars are present', async () => {
    it('should pass when all required vars are present', async () => {
    it('should pass when nested elements are present in the XML', async () => {
    it('should pass when nested elements are present', async () => {
    it('should pass when required elements are present in the XML', async () => {
    it('should pass when required elements are present', async () => {
    it('should pass when required elements are specified as an array', async () => {
    it('should pass when required elements are specified as an object', async () => {
    it('should pass when the cost is below the threshold', async () => {
    it('should pass when the latency assertion passes', async () => {
    it('should pass when the latency is 0ms', async () => {
    it('should pass when the output contains valid XML', async () => {
    it('should pass when the output is valid XML', async () => {
    it('should pass when the perplexity assertion passes', async () => {
    it('should pass when the perplexity-score assertion passes', async () => {
    it('should throw an error when context var is missing', async () => {
    it('should throw an error when context var is missing', async () => {
    it('should throw an error when grading result is missing latencyMs', async () => {
    it('should throw an error when output is not a string', async () => {
    it('should throw an error when query var is missing', async () => {
    it('should throw an error when query var is missing', async () => {
    it('should throw an error when threshold is not provided', async () => {
    it('should throw an error when vars object is missing', async () => {
    it('should throw an error when vars object is missing', async () => {
    it('should throw an error when xml assertion value is invalid', async () => {
    it('uses assert-set weight', async () => {
    jest
    jest.clearAllMocks();
    jest.clearAllMocks();
    jest.doMock(path.resolve('/config_path/path/to/assert.js'), () => mockFn, { virtual: true });
    jest.mocked(fetchWithRetries).mockImplementation(() =>
    jest.mocked(fetchWithRetries).mockImplementation(() =>
    jest.mocked(fetchWithRetries).mockImplementation(() =>
    jest.mocked(fs.readFileSync).mockReturnValue(
    jest.mocked(fs.readFileSync).mockReturnValue(
    jest.mocked(fs.readFileSync).mockReturnValue(
    jest.mocked(fs.readFileSync).mockReturnValue(
    jest.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({ key: 'value' }));
    jest.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({ key: 'value' }));
    jest.mocked(runPythonCode).mockResolvedValueOnce(expectedPythonValue);
    jest.resetModules();
    jest.resetModules();
    jest.resetModules();
    matchesContextFaithfulness: jest
    matchesContextRelevance: jest
    process.env.PROMPTFOO_DISABLE_AJV_STRICT_MODE = 'true';
    readFile: jest.fn(),
    runPython: jest.fn(actual.runPython),
    runPythonCode: jest.fn(actual.runPythonCode),
    threshold: 0.5,
    threshold: 0.75,
    threshold: 5,
    type: 'contains-all',
    type: 'contains-any',
    type: 'contains-json',
    type: 'contains-json',
    type: 'equals',
    type: 'equals',
    type: 'icontains',
    type: 'is-json',
    type: 'is-json',
    type: 'is-json',
    type: 'is-sql',
    type: 'is-sql',
    type: 'is-sql',
    type: 'is-sql',
    type: 'is-sql',
    type: 'javascript',
    type: 'javascript',
    type: 'javascript',
    type: 'javascript',
    type: 'javascript',
    type: 'javascript',
    type: 'levenshtein',
    type: 'not-contains',
    type: 'not-equals',
    type: 'not-icontains',
    type: 'not-is-sql',
    type: 'not-regex',
    type: 'regex',
    type: 'rouge-n',
    type: 'starts-with',
    type: 'webhook',
    value: '\\d{3}-\\d{2}-\\d{4}',
    value: '\\d{3}-\\d{2}-\\d{4}',
    value: 'expected output',
    value: 'Expected output',
    value: 'Expected output',
    value: 'Expected',
    value: 'https://example.com/webhook',
    value: 'output === "Expected output"',
    value: 'output.length * 10',
    value: 'output.length * 10',
    value: 'This is the expected output.',
    value: 'unexpected output',
    value: 'Unexpected output',
    value: 'Unexpected output',
    value: ['option1', 'option2', 'option3'],
    value: ['option1', 'option2', 'option3'],
    value: {
    value: {
    value: {
    value: {
    value: {
    value: {
    value: { key: 'value' },
    value: `
    value: `
    value: async (output: string) => ({
    value: async (output: string) => ({
  );
  );
  );
  ])(
  ])(
  ])(
  },
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  };
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  // Test for contains-all assertion
  // Test for contains-any assertion
  // Test for icontains assertion
  // Test for levenshtein assertion
  // Test for not-icontains assertion
  // Test for not-regex assertion
  // Test for regex assertion
  // Test for rouge-n assertion
  // Test for starts-with assertion
  // Tests for webhook assertion
  afterAll(() => {
  afterEach(() => {
  afterEach(() => {
  ApiProvider,
  Assertion,
  AtomicTestCase,
  basePath: '/config_path',
  beforeAll(() => {
  beforeEach(() => {
  beforeEach(() => {
  const actual = jest.requireActual('../src/fetch');
  const actual = jest.requireActual('../src/matchers');
  const actual = jest.requireActual('../src/python/pythonUtils');
  const actual = jest.requireActual('../src/python/wrapper');
  const containsAllAssertion: Assertion = {
  const containsAnyAssertion: Assertion = {
  const containsJsonAssertion: Assertion = {
  const containsJsonAssertionWithSchema: Assertion = {
  const containsLowerAssertion: Assertion = {
  const containsRegexAssertion: Assertion = {
  const equalityAssertion: Assertion = {
  const equalityAssertionWithObject: Assertion = {
  const isJsonAssertion: Assertion = {
  const isJsonAssertionWithSchema: Assertion = {
  const isJsonAssertionWithSchemaYamlString: Assertion = {
  const isSqlAssertion: Assertion = {
  const isSqlAssertionWithDatabase: Assertion = {
  const isSqlAssertionWithDatabaseAndBothList: Assertion = {
  const isSqlAssertionWithDatabaseAndWhiteColumnList: Assertion = {
  const isSqlAssertionWithDatabaseAndWhiteTableList: Assertion = {
  const javascriptFunctionAssertion: Assertion = {
  const javascriptFunctionFailAssertion: Assertion = {
  const javascriptMultilineStringAssertion: Assertion = {
  const javascriptStringAssertion: Assertion = {
  const javascriptStringAssertionWithNumber: Assertion = {
  const javascriptStringAssertionWithNumberAndThreshold: Assertion = {
  const levenshteinAssertion: Assertion = {
  const notContainsAssertion: Assertion = {
  const notContainsLowerAssertion: Assertion = {
  const notContainsRegexAssertion: Assertion = {
  const notEqualsAssertion: Assertion = {
  const notIsSqlAssertion: Assertion = {
  const rougeNAssertion: Assertion = {
  const startsWithAssertion: Assertion = {
  const test: AtomicTestCase = {
  const webhookAssertion: Assertion = {
  containsXml,
  createAjv,
  DefaultEmbeddingProvider,
  DefaultGradingJsonProvider,
  describe('assert-set', () => {
  describe('contains-xml', () => {
  describe('context-faithfulness assertion', () => {
  describe('context-relevance assertion', () => {
  describe('cost assertion', () => {
  describe('is-valid-openai-function-call assertion', () => {
  describe('is-valid-openai-tools-call assertion', () => {
  describe('is-xml', () => {
  describe('latency assertion', () => {
  describe('perplexity assertion', () => {
  describe('perplexity-score assertion', () => {
  describe('Similarity assertion', () => {
  getDb: jest.fn(),
  globSync: jest.fn(),
  GradingResult,
  it.each([
  it.each([
  it.each([
  it('preserves default provider', async () => {
  it('should add formats to the Ajv instance', () => {
  it('should create an Ajv instance with default options', () => {
  it('should disable strict mode when PROMPTFOO_DISABLE_AJV_STRICT_MODE is set', () => {
  it('should fail contains-json assertion with invalid data against external schema', async () => {
  it('should fail contains-json assertion with predefined schema and invalid data', async () => {
  it('should fail when any assertion fails', async () => {
  it('should fail when combined score is less than threshold', async () => {
  it('should fail when javascript returns a number below threshold', async () => {
  it('should fail when the contains-all assertion fails', async () => {
  it('should fail when the contains-any assertion fails', async () => {
  it('should fail when the contains-json assertion fails', async () => {
  it('should fail when the contains-sql does not contain code block', async () => {
  it('should fail when the contains-sql does not contain sql in code block', async () => {
  it('should fail when the equality assertion fails', async () => {
  it('should fail when the equality assertion with object fails with external object', async () => {
  it('should fail when the equality assertion with object fails', async () => {
  it('should fail when the function returns fail', async () => {
  it('should fail when the icontains assertion fails', async () => {
  it('should fail when the icontains-all assertion fails', async () => {
  it('should fail when the icontains-any assertion fails', async () => {
  it('should fail when the is-json assertion fails with external schema', async () => {
  it('should fail when the is-json assertion fails with schema YAML string', async () => {
  it('should fail when the is-json assertion fails with schema', async () => {
  it('should fail when the is-json assertion fails', async () => {
  it('should fail when the is-sql assertion fails due to missing authorities for DELETE statement in MySQL Database syntax', async () => {
  it('should fail when the is-sql assertion fails due to missing table authority for MySQL Database syntax', async () => {
  it('should fail when the is-sql assertion fails given MySQL Database syntax and allowedColumns', async () => {
  it('should fail when the is-sql assertion fails given MySQL Database syntax and allowedTables', async () => {
  it('should fail when the is-sql assertion fails given MySQL Database syntax, allowedTables, and allowedColumns', async () => {
  it('should fail when the is-sql assertion fails given MySQL Database syntax', async () => {
  it('should fail when the is-sql assertion fails', async () => {
  it('should fail when the javascript assertion fails', async () => {
  it('should fail when the javascript does not match vars', async () => {
  it('should fail when the levenshtein assertion fails', async () => {
  it('should fail when the not-contains assertion fails', async () => {
  it('should fail when the not-equals assertion fails', async () => {
  it('should fail when the not-icontains assertion fails', async () => {
  it('should fail when the not-is-sql assertion fails', async () => {
  it('should fail when the not-regex assertion fails', async () => {
  it('should fail when the regex assertion fails', async () => {
  it('should fail when the rouge-n assertion fails', async () => {
  it('should fail when the starts-with assertion fails', async () => {
  it('should fail when the webhook assertion fails', async () => {
  it('should fail when the webhook returns an error', async () => {
  it('should handle empty elements correctly', () => {
  it('should handle multiple XML fragments', () => {
  it('should handle output as an object', async () => {
  it('should handle output as an object', async () => {
  it('should handle output strings with both single and double quotes correctly in python assertion', async () => {
  it('should handle when python file assertions throw an error', async () => {
  it('should handle XML with CDATA sections', () => {
  it('should handle XML with comments', () => {
  it('should invalidate a malformed XML string', () => {
  it('should invalidate when a nested required element is missing', () => {
  it('should invalidate when a required element is missing', () => {
  it('should pass a score through when the javascript returns a number', async () => {
  it('should pass when all assertions pass', async () => {
  it('should pass when assertion passes - with vars', async () => {
  it('should pass when combined score is greater than threshold', async () => {
  it('should pass when javascript function assertion passes - with vars', async () => {
  it('should pass when javascript returns a number above threshold', async () => {
  it('should pass when the contains-all assertion passes', async () => {
  it('should pass when the contains-any assertion passes', async () => {
  it('should pass when the contains-json assertion passes with external schema', async () => {
  it('should pass when the contains-json assertion passes with multiple json values', async () => {
  it('should pass when the contains-json assertion passes with schema with YAML string', async () => {
  it('should pass when the contains-json assertion passes with schema', async () => {
  it('should pass when the contains-json assertion passes with valid and invalid json', async () => {
  it('should pass when the contains-json assertion passes', async () => {
  it('should pass when the contains-sql assertion passes', async () => {
  it('should pass when the contains-sql assertion sees `sql` in code block', async () => {
  it('should pass when the contains-sql assertion sees sql without code block', async () => {
  it('should pass when the equality assertion passes', async () => {
  it('should pass when the equality assertion with object passes with external json', async () => {
  it('should pass when the equality assertion with object passes', async () => {
  it('should pass when the function returns pass', async () => {
  it('should pass when the icontains assertion passes', async () => {
  it('should pass when the icontains-all assertion passes', async () => {
  it('should pass when the icontains-any assertion passes', async () => {
  it('should pass when the is-json assertion passes with external schema', async () => {
  it('should pass when the is-json assertion passes with schema YAML string', async () => {
  it('should pass when the is-json assertion passes with schema', async () => {
  it('should pass when the is-json assertion passes', async () => {
  it('should pass when the is-sql assertion passes given MySQL Database syntax and allowedColumns', async () => {
  it('should pass when the is-sql assertion passes given MySQL Database syntax and allowedTables', async () => {
  it('should pass when the is-sql assertion passes given MySQL Database syntax, allowedTables, and allowedColumns', async () => {
  it('should pass when the is-sql assertion passes given MySQL Database syntax', async () => {
  it('should pass when the is-sql assertion passes', async () => {
  it('should pass when the javascript assertion passes', async () => {
  it('should pass when the levenshtein assertion passes', async () => {
  it('should pass when the multiline javascript assertion fails', async () => {
  it('should pass when the multiline javascript assertion passes', async () => {
  it('should pass when the not-contains assertion passes', async () => {
  it('should pass when the not-equals assertion passes', async () => {
  it('should pass when the not-icontains assertion passes', async () => {
  it('should pass when the not-is-sql assertion passes', async () => {
  it('should pass when the not-regex assertion passes', async () => {
  it('should pass when the regex assertion passes', async () => {
  it('should pass when the rouge-n assertion passes', async () => {
  it('should pass when the starts-with assertion passes', async () => {
  it('should pass when the webhook assertion passes', async () => {
  it('should resolve js paths relative to the configuration file', async () => {
  it('should return false when no XML is present', () => {
  it('should return false when required elements are missing', () => {
  it('should return true when valid XML is present', () => {
  it('should set score when javascript returns false', async () => {
  it('should use the provider from the assertion if it exists', async () => {
  it('should validate a simple valid XML string', () => {
  it('should validate JSON with formats using ajv-formats - failure', async () => {
  it('should validate JSON with formats using ajv-formats', async () => {
  it('should validate nested elements correctly', () => {
  it('should validate required elements', () => {
  it('should validate the example XML structure', () => {
  it('should validate when all required elements are present', () => {
  it('should validate XML with attributes', () => {
  it('should validate XML with multiple siblings', () => {
  it('should validate XML with namespaces', () => {
  it('should validate XML with processing instructions', () => {
  OpenAiChatCompletionProvider,
  promises: {
  ProviderResponse,
  ProxyAgent: jest.fn().mockImplementation(() => ({})),
  readFileSync: jest.fn(),
  return {
  return {
  return {
  return {
  runAssertion,
  runAssertions,
  validateXml,
} from '../src/assertions';
} from '../src/providers/openai';
} from '../src/types';
});
});
});
});
});
});
});
});
});
}));
}));
}));
}));
}));
`,
const Grader = new TestGrader();
describe('containsXml', () => {
describe('createAjv', () => {
describe('runAssertion', () => {
describe('runAssertions', () => {
describe('validateXml', () => {
import {
import {
import { fetchWithRetries } from '../src/fetch';
import { ReplicateModerationProvider } from '../src/providers/replicate';
import { Response } from 'node-fetch';
import { runPython } from '../src/python/pythonUtils';
import { runPythonCode } from '../src/python/wrapper';
import { TestGrader } from './utils';
import * as fs from 'fs';
import * as path from 'path';
import dedent from 'dedent';
import type {
jest.mock('../src/cliState', () => ({
jest.mock('../src/database', () => ({
jest.mock('../src/esm');
jest.mock('../src/fetch', () => {
jest.mock('../src/matchers', () => {
jest.mock('../src/python/pythonUtils', () => {
jest.mock('../src/python/wrapper', () => {
jest.mock('fs', () => ({
jest.mock('glob', () => ({
jest.mock('proxy-agent', () => ({
