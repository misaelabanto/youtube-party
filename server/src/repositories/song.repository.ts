import { models } from '~/config/schema';
import { AddSongBody } from '~/models/song.model';

export const songRepository = {
	getSongs: async () => {
		return models.Song.find().populate('addedBy');
	},

	getSong: async (id: string) => {
		return models.Song.findById(id);
	},

	addSong: async (addSongBody: AddSongBody) => {
		return models.Song.create(addSongBody);
	},

	deleteSong: async (id: string) => {
		return models.Song.deleteOne({ _id: id });
	},
};
