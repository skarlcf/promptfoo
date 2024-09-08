import { relations, sql } from 'drizzle-orm';
import type { MySqlTableWithColumns } from 'drizzle-orm/mysql-core';
import { mysqlTable, varchar, timestamp, json } from 'drizzle-orm/mysql-core';
import type { PgTableWithColumns } from 'drizzle-orm/pg-core';
import { pgTable, text as pgText, timestamp as pgTimestamp, jsonb } from 'drizzle-orm/pg-core';
import type { SQLiteTableWithColumns } from 'drizzle-orm/sqlite-core';
import { text, integer, sqliteTable, primaryKey, index } from 'drizzle-orm/sqlite-core';
import { getEnvDbType } from '../envars';
import type { EvaluateSummary, UnifiedConfig } from '../types';

const dbType = getEnvDbType();

// Helper function to create tables based on the database type
function createTable<T extends Record<string, unknown>>(
  name: string,
  columns: T,
  extraConfig?: (
    table: SQLiteTableWithColumns<T> | PgTableWithColumns<T> | MySqlTableWithColumns<T>,
  ) => any,
): SQLiteTableWithColumns<T> | PgTableWithColumns<T> | MySqlTableWithColumns<T> {
  switch (dbType) {
    case 'sqlite':
      return sqliteTable(name, columns, extraConfig as any);
    case 'postgres':
      return pgTable(name, columns, extraConfig as any);
    case 'mysql':
    default:
      return mysqlTable(name, columns, extraConfig as any);
  }
}

// Helper functions for common column types
function idColumn() {
  switch (dbType) {
    case 'sqlite':
      return text('id').primaryKey();
    case 'postgres':
      return pgText('id').primaryKey();
    case 'mysql':
    default:
      return varchar('id', { length: 255 }).primaryKey();
  }
}

function createdAtColumn() {
  switch (dbType) {
    case 'sqlite':
      return integer('created_at')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`);
    case 'postgres':
      return pgTimestamp('created_at').notNull().defaultNow();
    case 'mysql':
    default:
      return timestamp('created_at').notNull().defaultNow();
  }
}

function jsonColumn(name: string) {
  switch (dbType) {
    case 'sqlite':
      return text(name, { mode: 'json' });
    case 'postgres':
      return jsonb(name);
    case 'mysql':
    default:
      return json(name);
  }
}

// Define tables
export const prompts = createTable(
  'prompts',
  {
    id: idColumn(),
    createdAt: createdAtColumn(),
    prompt: text('prompt').notNull(),
  },
  (table) => ({
    createdAtIdx: index('prompts_created_at_idx').on(table.createdAt),
  }),
);

export const tags = createTable(
  'tags',
  {
    id: idColumn(),
    name: text('name').notNull().unique(),
    value: text('value').notNull(),
  },
  (table) => ({
    nameIdx: index('tags_name_idx').on(table.name),
  }),
);

export const evals = createTable(
  'evals',
  {
    id: idColumn(),
    createdAt: createdAtColumn(),
    author: text('author'),
    description: text('description'),
    results: jsonColumn('results').$type<EvaluateSummary>().notNull(),
    config: jsonColumn('config').$type<Partial<UnifiedConfig>>().notNull(),
  },
  (table) => ({
    createdAtIdx: index('evals_created_at_idx').on(table.createdAt),
    authorIdx: index('evals_author_idx').on(table.author),
  }),
);

export const evalsToPrompts = createTable(
  'evals_to_prompts',
  {
    evalId: text('eval_id')
      .notNull()
      .references(() => evals.id),
    promptId: text('prompt_id')
      .notNull()
      .references(() => prompts.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.evalId, t.promptId] }),
    evalIdIdx: index('evals_to_prompts_eval_id_idx').on(t.evalId),
    promptIdIdx: index('evals_to_prompts_prompt_id_idx').on(t.promptId),
  }),
);

export const evalsToTags = createTable(
  'evals_to_tags',
  {
    evalId: text('eval_id')
      .notNull()
      .references(() => evals.id),
    tagId: text('tag_id')
      .notNull()
      .references(() => tags.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.evalId, t.tagId] }),
    evalIdIdx: index('evals_to_tags_eval_id_idx').on(t.evalId),
    tagIdIdx: index('evals_to_tags_tag_id_idx').on(t.tagId),
  }),
);

export const datasets = createTable(
  'datasets',
  {
    id: idColumn(),
    tests: jsonColumn('tests').$type<UnifiedConfig['tests']>(),
    createdAt: createdAtColumn(),
  },
  (table) => ({
    createdAtIdx: index('datasets_created_at_idx').on(table.createdAt),
  }),
);

export const evalsToDatasets = createTable(
  'evals_to_datasets',
  {
    evalId: text('eval_id')
      .notNull()
      .references(() => evals.id),
    datasetId: text('dataset_id')
      .notNull()
      .references(() => datasets.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.evalId, t.datasetId] }),
    evalIdIdx: index('evals_to_datasets_eval_id_idx').on(t.evalId),
    datasetIdIdx: index('evals_to_datasets_dataset_id_idx').on(t.datasetId),
  }),
);

// Relations
export const promptsRelations = relations(prompts, ({ many }) => ({
  evalsToPrompts: many(evalsToPrompts),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  evalsToTags: many(evalsToTags),
}));

export const evalsRelations = relations(evals, ({ many }) => ({
  evalsToPrompts: many(evalsToPrompts),
  evalsToDatasets: many(evalsToDatasets),
  evalsToTags: many(evalsToTags),
}));

export const datasetsRelations = relations(datasets, ({ many }) => ({
  evalsToDatasets: many(evalsToDatasets),
}));

export const evalsToPromptsRelations = relations(evalsToPrompts, ({ one }) => ({
  eval: one(evals, {
    fields: [evalsToPrompts.evalId],
    references: [evals.id],
  }),
  prompt: one(prompts, {
    fields: [evalsToPrompts.promptId],
    references: [prompts.id],
  }),
}));

export const evalsToTagsRelations = relations(evalsToTags, ({ one }) => ({
  eval: one(evals, {
    fields: [evalsToTags.evalId],
    references: [evals.id],
  }),
  tag: one(tags, {
    fields: [evalsToTags.tagId],
    references: [tags.id],
  }),
}));

export const evalsToDatasetsRelations = relations(evalsToDatasets, ({ one }) => ({
  eval: one(evals, {
    fields: [evalsToDatasets.evalId],
    references: [evals.id],
  }),
  dataset: one(datasets, {
    fields: [evalsToDatasets.datasetId],
    references: [datasets.id],
  }),
}));
