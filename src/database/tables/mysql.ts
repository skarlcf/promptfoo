import { relations, sql } from 'drizzle-orm';
import {
  text,
  timestamp,
  mysqlTable,
  primaryKey,
  index,
  uniqueIndex,
  json,
} from 'drizzle-orm/mysql-core';
import type { EvaluateSummary, UnifiedConfig } from '../../types';

// ------------ Prompts ------------

export const prompts = mysqlTable(
  'prompts',
  {
    id: text('id').primaryKey(),
    createdAt: timestamp('created_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    prompt: text('prompt').notNull(),
  },
  (table) => ({
    createdAtIdx: index('prompts_created_at_idx').on(table.createdAt),
  }),
);

// ------------ Tags ------------

export const tags = mysqlTable(
  'tags',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    value: text('value').notNull(),
  },
  (table) => ({
    nameIdx: index('tags_name_idx').on(table.name),
    uniqueNameValue: uniqueIndex('tags_name_value_unique').on(table.name, table.value),
  }),
);

// ------------ Evals ------------

export const evals = mysqlTable(
  'evals',
  {
    id: text('id').primaryKey(),
    createdAt: timestamp('created_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    author: text('author'),
    description: text('description'),
    results: json('results').$type<EvaluateSummary>().notNull(),
    config: json('config').$type<Partial<UnifiedConfig>>().notNull(),
  },
  (table) => ({
    createdAtIdx: index('evals_created_at_idx').on(table.createdAt),
    authorIdx: index('evals_author_idx').on(table.author),
  }),
);

export const evalsToPrompts = mysqlTable(
  'evals_to_prompts',
  {
    evalId: text('eval_id')
      .notNull()
      .references(() => evals.id, { onDelete: 'cascade' }),
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

export const promptsRelations = relations(prompts, ({ many }) => ({
  evalsToPrompts: many(evalsToPrompts),
}));

export const evalsToTags = mysqlTable(
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

export const tagsRelations = relations(tags, ({ many }) => ({
  evalsToTags: many(evalsToTags),
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

// ------------ Datasets ------------

export const datasets = mysqlTable(
  'datasets',
  {
    id: text('id').primaryKey(),
    tests: json('tests').$type<UnifiedConfig['tests']>(),
    createdAt: timestamp('created_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    createdAtIdx: index('datasets_created_at_idx').on(table.createdAt),
  }),
);

export const evalsToDatasets = mysqlTable(
  'evals_to_datasets',
  {
    evalId: text('eval_id')
      .notNull()
      .references(() => evals.id, { onDelete: 'cascade' }),
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

export const datasetsRelations = relations(datasets, ({ many }) => ({
  evalsToDatasets: many(evalsToDatasets),
}));

// ------------ Evals ------------

export const evalsRelations = relations(evals, ({ many }) => ({
  evalsToPrompts: many(evalsToPrompts),
  evalsToDatasets: many(evalsToDatasets),
  evalsToTags: many(evalsToTags),
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
