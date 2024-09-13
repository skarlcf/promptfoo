import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import * as path from 'path';
import { fileURLToPath } from 'url';

import { getDb } from './database';
import logger from './logger';

/**
 * Run migrations on the database, skipping the ones already applied. Also creates the sqlite db if it doesn't exist.
 */
export async function runDbMigrations() {
  try {
    const db = getDb();
    const migrationsFolder = new URL('../drizzle', import.meta.url).pathname;
    logger.debug(`Running migrations from ${migrationsFolder}...`);
    await migrate(db, { migrationsFolder });
  } catch (error) {
    logger.error('Error running database migrations:', error);
  }
}

function resolveImportMetaUrl(specifier: string) {
  if (typeof import.meta.resolve === 'function') {
    return import.meta.resolve(specifier);
  }
  // Fallback for environments where import.meta.resolve is not available
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.resolve(__dirname, specifier);
}

if (import.meta.url === resolveImportMetaUrl(process.argv[1])) {
  runDbMigrations();
}
