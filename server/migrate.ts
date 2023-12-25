import { migrate } from 'drizzle-orm/bun-sqlite/migrator';

import { Database } from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';

const sqlite = new Database('youtubeparty.sqlite');
const db = drizzle(sqlite);
await migrate(db, { migrationsFolder: './drizzle' });
