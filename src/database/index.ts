import Database from 'better-sqlite3';
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import type { MySql2Database } from 'drizzle-orm/mysql2';
import { drizzle as drizzleMysql } from 'drizzle-orm/mysql2';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { drizzle as drizzleNode } from 'drizzle-orm/node-postgres';
import mysql from 'mysql2/promise';
import * as path from 'path';
import { Client } from 'pg';
import { getEnvDbType, getEnvString } from '../envars';
import { getConfigDirectoryPath } from '../util/config';

let dbInstance: BetterSQLite3Database | NodePgDatabase | MySql2Database;

export function getDbPath() {
  return path.resolve(getConfigDirectoryPath(true /* createIfNotExists */), 'promptfoo.db');
}

export function getDbSignalPath() {
  return path.resolve(getConfigDirectoryPath(true /* createIfNotExists */), 'evalLastWritten');
}

export async function getDb(): Promise<typeof dbInstance> {
  if (dbInstance) {
    return dbInstance;
  }

  const dbType = getEnvDbType();

  if (dbType === 'postgres') {
    const client = new Client({
      connectionString: getEnvString('PROMPTFOO_DB_URL', 'postgres://user:pass@localhost:5432/db'),
    });
    client.connect();
    return drizzleNode(client);
  }
  if (dbType === 'mysql') {
    const connection = await mysql.createConnection(
      getEnvString('PROMPTFOO_DB_URL', 'mysql://user:pass@localhost:3306/db'),
    );
    return drizzleMysql(connection);
  }
  const sqlite = new Database(getDbPath());
  return drizzle(sqlite);
}
