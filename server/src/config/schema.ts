import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	emoji: text('emoji').notNull(),
});

export const songs = sqliteTable('songs', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	addedAt: integer('addedAt').notNull(),
	upVotes: integer('upVotes').notNull().default(0),
	downVotes: integer('downVotes').notNull().default(0),
	addedBy: integer('addedBy')
		.references(() => users.id)
		.notNull(),
});
