import { eq } from 'drizzle-orm';
import db from '~/config/database';
import * as schema from '~/config/schema';
import { AddSongBody } from '~/models/song.model';

export const songRepository = {
	getSongs: async () => {
		return db.query.songs.findMany({
			with: {
				addedBy: true,
			},
		});
	},

	getSong: async (id: number) => {
		return db.query.songs.findFirst({
			where: eq(schema.songs.id, id),
			with: {
				addedBy: true,
			},
		});
	},

	addSong: async (addSongBody: AddSongBody) => {
		return db
			.insert(schema.songs)
			.values({
				videoId: addSongBody.videoId,
				title: addSongBody.title,
				addedBy: addSongBody.addedBy,
				thumbnail: addSongBody.thumbnail,
			})
			.returning();
	},

	deleteSong: async (id: number) => {
		return db.delete(schema.songs).where(eq(schema.songs.id, id));
	},
};
