import { migrate as migrateSqlite } from 'drizzle-orm/better-sqlite3/migrator';
import { migrate as migrateMysql } from 'drizzle-orm/mysql2/migrator';
import { migrate as migratePg } from 'drizzle-orm/node-postgres/migrator';
import * as path from 'path';
import { getDb } from './database';
import { getEnvDbType } from './envars';
import logger from './logger';

export async function migrate() {
  const db = await getDb();
  const dbType = getEnvDbType();

  switch (dbType) {
    case 'sqlite':
      await migrateSqlite(db as any, { migrationsFolder });
      break;
    case 'postgres':
      await migratePg(db as any, { migrationsFolder });
      break;
    case 'mysql':
      await migrateMysql(db as any, { migrationsFolder });
      break;
  }
}

/**
 * Run migrations on the database, skipping the ones already applied. Also creates the sqlite db if it doesn't exist.
 */
export async function runDbMigrations() {
  try {
    const db = await getDb();
    const migrationsFolder = path.join(__dirname, '..', 'drizzle');
    logger.debug(`Running migrations from ${migrationsFolder}...`);
    await migrate(db, { migrationsFolder });
  } catch (error) {
    logger.error('Error running database migrations:', error);
  }
}

if (require.main === module) {
  runDbMigrations();
}
