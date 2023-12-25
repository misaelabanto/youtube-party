import { Database } from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import * as schema from '~/config/schema';

const sqlite = new Database('youtubeparty.sqlite');

export default drizzle(sqlite, { schema });
