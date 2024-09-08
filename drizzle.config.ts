import { defineConfig } from 'drizzle-kit';
import { getDbPath } from './src/database';
import { getEnvDbType, getEnvString } from './src/envars';

const dbType = getEnvDbType();

export default defineConfig({
  schema: './src/database/tables.ts',
  out: './drizzle',
  ...(dbType === 'sqlite'
    ? {
        driver: 'better-sqlite',
        dbCredentials: {
          url: `file:${getDbPath()}`,
        },
      }
    : dbType === 'postgres'
      ? {
          driver: 'pg',
          dbCredentials: {
            connectionString: getEnvString(
              'PROMPTFOO_DB_URL',
              'postgres://user:pass@localhost:5432/db',
            ),
          },
        }
      : {
          driver: 'mysql2',
          dbCredentials: {
            uri: getEnvString('PROMPTFOO_DB_URL', 'mysql://user:pass@localhost:3306/db'),
          },
        }),
});
