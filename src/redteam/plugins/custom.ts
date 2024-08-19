import dedent from 'dedent';
import type { z } from 'zod';
import type { ApiProvider, Assertion } from '../../types';
import type { RedteamPluginObject } from '../../types/redteam';
import { RedteamCustomPluginSchema } from '../../validators/redteam';
import { PluginBase, RedteamModelGrader } from './base';

export const PLUGIN_ID = 'promptfoo:redteam:custom';

export class CustomPlugin extends PluginBase {
  private customConfig: z.infer<typeof RedteamCustomPluginSchema>;

  /**
   * Creates an instance of CustomPlugin.
   * @param provider - The API provider.
   * @param purpose - The purpose of the plugin.
   * @param injectVar - The variable to inject.
   * @param customConfig - The custom configuration for the plugin.
   * @param modifiers - Optional modifiers for the plugin.
   */
  constructor(
    provider: ApiProvider,
    purpose: string,
    injectVar: string,
    customConfig: z.infer<typeof RedteamCustomPluginSchema>,
    modifiers: Record<string, string> = {},
  ) {
    super(provider, purpose, injectVar, modifiers);
    this.customConfig = customConfig;
  }

  /**
   * Gets the template for the plugin.
   * @returns A promise that resolves to the template string.
   */
  protected async getTemplate(): Promise<string> {
    return dedent(this.customConfig.template);
  }

  /**
   * Gets the assertions for the plugin.
   * @param prompt - The prompt string.
   * @returns An array of assertions.
   */
  protected getAssertions(prompt: string): Assertion[] {
    return [
      {
        type: PLUGIN_ID,
        metric: this.customConfig.id,
      },
    ];
  }
}

export class CustomGrader extends RedteamModelGrader {
  /**
   * Creates an instance of CustomGrader.
   * @param customConfig - The custom configuration for the grader.
   */
  constructor(private customConfig: z.infer<typeof RedteamCustomPluginSchema>) {
    super();
  }

  /**
   * Gets the ID of the grader.
   * @returns The grader ID string.
   */
  get id(): string {
    return `${PLUGIN_ID}:${this.customConfig.id}`;
  }

  /**
   * Gets the rubric for the grader.
   * @returns The grader rubric string.
   */
  get rubric(): string {
    return dedent(this.customConfig.grader);
  }
}

/**
 * Creates a custom plugin.
 * @param plugin - The redteam plugin object.
 * @param provider - The API provider.
 * @param purpose - The purpose of the plugin.
 * @param injectVar - The variable to inject.
 * @returns A promise that resolves to a CustomPlugin instance.
 * @throws Error if the plugin creation fails.
 */
export async function createCustomPlugin(
  plugin: RedteamPluginObject,
  provider: ApiProvider,
  purpose: string,
  injectVar: string,
): Promise<CustomPlugin> {
  try {
    const customConfig = await RedteamCustomPluginSchema.parseAsync(plugin);
    return new CustomPlugin(provider, purpose, injectVar, customConfig);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(errorMessage);
  }
}

/**
 * Creates a custom grader.
 * @param plugin - The redteam plugin object.
 * @returns A promise that resolves to a CustomGrader instance.
 * @throws Error if the grader creation fails.
 */
export async function createCustomGrader(plugin: RedteamPluginObject): Promise<CustomGrader> {
  try {
    const customConfig = await RedteamCustomPluginSchema.parseAsync(plugin);
    return new CustomGrader(customConfig);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(errorMessage);
  }
}
