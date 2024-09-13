import { getDbType } from '../index';
import * as mysqlTables from './mysql';
import * as pgTables from './pg';
import * as sqliteTables from './sqlite';

const dbType = getDbType();

let tables: typeof sqliteTables | typeof pgTables | typeof mysqlTables;

switch (dbType) {
  case 'postgres':
    tables = pgTables;
    break;
  case 'mysql':
    tables = mysqlTables;
    break;
  case 'sqlite':
  default:
    tables = sqliteTables;
    break;
}

export const {
  prompts,
  tags,
  evals,
  evalsToPrompts,
  evalsToTags,
  datasets,
  evalsToDatasets,
  promptsRelations,
  tagsRelations,
  evalsToTagsRelations,
  datasetsRelations,
  evalsRelations,
  evalsToPromptsRelations,
  evalsToDatasetsRelations,
} = tables;

// Export the type of the database
export { dbType };
