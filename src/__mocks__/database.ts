const mockDbInstance = {
  // Mock any method you use from the dbInstance
  // For example:
  // query: jest.fn().mockResolvedValue({}),
};

const mockRelations = jest.fn();

const mockSqliteTable = jest.fn().mockImplementation((tableName, schema) => {
  // You can customize this mock based on your testing needs
  return { tableName, schema };
});

export const prompts = mockSqliteTable('prompts', {
  /* schema definition */
});
export const promptsRelations = mockRelations;
export const datasets = mockSqliteTable('datasets', {
  /* schema definition */
});
export const datasetsRelations = mockRelations;
export const evals = mockSqliteTable('evals', {
  /* schema definition */
});
export const evalsRelations = mockRelations;
export const evalsToPrompts = mockSqliteTable('evals_to_prompts', {
  /* schema definition */
});
export const evalsToPromptsRelations = mockRelations;
export const evalsToDatasets = mockSqliteTable('evals_to_datasets', {
  /* schema definition */
});
export const evalsToDatasetsRelations = mockRelations;
export const llmOutputs = mockSqliteTable('llm_outputs', {
  /* schema definition */
});
export const llmOutputsRelations = mockRelations;
export const getDb = jest.fn(() => mockDbInstance);
