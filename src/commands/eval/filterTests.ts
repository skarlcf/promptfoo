import logger from '../../logger';
import type { TestSuite, TestCase } from '../../types';
import { filterFailingTests } from './filterFailingTests';
import { getNunjucksEngine } from '../../util/templates';

interface Args {
  firstN?: string;
  pattern?: string;
  failing?: string;
}

type Tests = TestSuite['tests'];

export async function filterTests(testSuite: TestSuite, args: Args): Promise<Tests> {
  let tests: TestCase[] = testSuite.tests || [];

  // If we have scenarios, we need to flatten them into individual tests
  if (testSuite.scenarios && testSuite.scenarios.length > 0) {
    const nunjucks = getNunjucksEngine(testSuite.nunjucksFilters);
    const scenarioTests = testSuite.scenarios.flatMap((scenario) =>
      scenario.config.flatMap((config) =>
        (scenario.tests || []).map((test) => {
          const vars = { ...config.vars, ...test.vars };
          const renderedDescription = test.description
            ? nunjucks.renderString(test.description, vars)
            : undefined;
          return {
            ...test,
            vars,
            description: renderedDescription,
          };
        }),
      ),
    );
    tests = [...tests, ...scenarioTests];
  }

  const { firstN, pattern, failing } = args;
  let newTests: TestCase[];

  if (failing) {
    newTests = await filterFailingTests(testSuite, failing);
  } else {
    newTests = tests;
  }

  if (pattern) {
    const regex = new RegExp(pattern);
    logger.debug(`Applying filter pattern: ${pattern}`);
    logger.debug(`Total tests before filtering: ${newTests.length}`);
    newTests = newTests.filter((test) => {
      const matches = regex.test(test.description || '');
      logger.debug(`Test description: "${test.description}", Matches: ${matches}`);
      return matches;
    });
    logger.debug(`Total tests after filtering: ${newTests.length}`);
  }

  if (firstN !== undefined) {
    const count = parseInt(firstN);

    if (Number.isNaN(count)) {
      throw new Error(`firstN must be a number, got: ${firstN}`);
    }

    newTests = newTests.slice(0, count);
  }

  return newTests;
}