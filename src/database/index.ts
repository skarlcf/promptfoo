import Database from 'better-sqlite3';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import { drizzle as drizzleMysql } from 'drizzle-orm/mysql2';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import mysql from 'mysql2/promise';
import * as path from 'path';
import { Pool } from 'pg';
import { getConfigDirectoryPath } from '../util/config';

let dbInstance:
  | ReturnType<typeof drizzleSqlite>
  | ReturnType<typeof drizzlePg>
  | ReturnType<typeof drizzleMysql>;

const DEFAULT_DB: 'postgres' | 'mysql' | 'sqlite' = (process.env.PROMPTFOO_DEFAULT_DB ||
  'sqlite') as 'postgres' | 'mysql' | 'sqlite';

export function getDbPath() {
  return path.resolve(getConfigDirectoryPath(true /* createIfNotExists */), 'promptfoo.db');
}

export function getDbSignalPath() {
  return path.resolve(getConfigDirectoryPath(true /* createIfNotExists */), 'evalLastWritten');
}

export function getDbType() {
  return DEFAULT_DB;
}

export function getDb():
  | ReturnType<typeof drizzlePg>
  | ReturnType<typeof drizzleMysql>
  | ReturnType<typeof drizzleSqlite> {
  if (!dbInstance) {
    switch (DEFAULT_DB) {
      case 'postgres':
        const pool = new Pool({
          connectionString: process.env.DATABASE_URL,
        });
        dbInstance = drizzlePg(pool);
        break;
      case 'mysql':
        const connection = mysql.createPool({
          uri: process.env.DATABASE_URL,
        });
        dbInstance = drizzleMysql(connection);
        break;
      case 'sqlite':
      default:
        const sqlite = new Database(getDbPath());
        dbInstance = drizzleSqlite(sqlite);
        break;
    }
  }
  return dbInstance;
}
