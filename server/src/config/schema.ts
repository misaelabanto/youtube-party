import { relations } from 'drizzle-orm';
import {
	integer,
	pgEnum,
	pgTable,
	serial,
	text,
	timestamp,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	emoji: text('emoji').notNull(),
});

export const songs = pgTable('songs', {
	id: serial('id').primaryKey(),
	videoId: text('videoId').notNull(),
	title: text('title').notNull(),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	addedBy: integer('addedBy')
		.references(() => users.id)
		.notNull(),
	thumbnail: text('thumbnail').notNull(),
});

export const voteEnum = pgEnum('voteType', ['up', 'down']);

export const votes = pgTable('votes', {
	id: serial('id').primaryKey(),
	songId: integer('songId')
		.references(() => songs.id)
		.notNull(),
	userId: integer('userId')
		.references(() => users.id)
		.notNull(),
	voteType: voteEnum('voteType').notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
	posts: many(songs),
}));

export const songsRelations = relations(songs, ({ one, many }) => ({
	addedBy: one(users, {
		fields: [songs.addedBy],
		references: [users.id],
	}),
	votes: many(votes),
}));

export const votesRelations = relations(votes, ({ one }) => ({
	song: one(songs, {
		fields: [votes.songId],
		references: [songs.id],
	}),
	user: one(users, {
		fields: [votes.userId],
		references: [users.id],
	}),
}));
