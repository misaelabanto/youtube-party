import { Database } from 'bun:sqlite';

const db = new Database('youtubeparty.sqlite');

export default db;
