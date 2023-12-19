import db from '~/config/database';
import { AddSongBody, Song } from '~/models/song.model';
import { $, T$ } from '~/utils/$';

db.run(`CREATE TABLE IF NOT EXISTS songs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  addedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  upVotes INTEGER DEFAULT 0,
  downVotes INTEGER DEFAULT 0,
  addedBy INTEGER NOT NULL REFERENCES users(id)
)`);

export const songRepository = {
	getSongs: async () => {
		return db.query<Song, []>('SELECT * FROM songs').all();
	},

	getSong: async (id: string) => {
		return db
			.prepare<Song, [string]>('SELECT * FROM songs WHERE id = ?')
			.get(id);
	},

	addSong: async (addSongBody: AddSongBody) => {
		return db
			.prepare<Song, T$<AddSongBody>>(
				'INSERT INTO songs (id, title, addedBy) VALUES ($id, $title, 1)'
			)
			.run($(addSongBody));
	},

	deleteSong: async (id: string) => {
		return db.prepare<Song, [string]>('DELETE FROM songs WHERE id = ?').run(id);
	},
};
