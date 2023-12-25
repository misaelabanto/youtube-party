import { eq } from 'drizzle-orm';
import db from '~/config/database';
import * as schema from '~/config/schema';
import { AddSongBody } from '~/models/song.model';

export const songRepository = {
	getSongs: async () => {
		return db.select().from(schema.songs).all();
	},

	getSong: async (id: string) => {
		return db.select().from(schema.songs).where(eq(schema.songs.id, id)).get();
	},

	addSong: async (addSongBody: AddSongBody) => {
		return db
			.insert(schema.songs)
			.values({
				id: addSongBody.id,
				title: addSongBody.title,
				addedBy: addSongBody.addedBy,
				addedAt: Date.now(),
			})
			.returning();
	},

	deleteSong: async (id: string) => {
		return db.delete(schema.songs).where(eq(schema.songs.id, id));
	},
};
