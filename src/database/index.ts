import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { drizzle as drizzleMysql } from 'drizzle-orm/mysql2';
import { drizzle as drizzleNode } from 'drizzle-orm/node-postgres';
import mysql from 'mysql2/promise';
import * as path from 'path';
import { Client } from 'pg';
import { getEnvDbType, getEnvString } from '../envars';
import { getConfigDirectoryPath } from '../util/config';

let dbInstance:
  | ReturnType<typeof drizzle>
  | ReturnType<typeof drizzleNode>
  | ReturnType<typeof drizzleMysql>
  | null = null;

export function getDbPath() {
  return path.resolve(getConfigDirectoryPath(true /* createIfNotExists */), 'promptfoo.db');
}

export function getDbSignalPath() {
  return path.resolve(getConfigDirectoryPath(true /* createIfNotExists */), 'evalLastWritten');
}

export function getDb() {
  if (!dbInstance) {
    const dbType = getEnvDbType();

    switch (dbType) {
      case 'sqlite':
        const sqlite = new Database(getDbPath());
        dbInstance = drizzle(sqlite);
        break;
      case 'postgres':
        const client = new Client({
          connectionString: getEnvString(
            'PROMPTFOO_DB_URL',
            'postgres://user:pass@localhost:5432/db',
          ),
        });
        client.connect();
        dbInstance = drizzleNode(client);
        break;
      case 'mysql':
      default:
        const connection = mysql.createConnection(
          getEnvString('PROMPTFOO_DB_URL', 'mysql://user:pass@localhost:3306/db'),
        );
        dbInstance = drizzleMysql(connection);
        break;
    }
  }
  return dbInstance;
}
