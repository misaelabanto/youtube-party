import { models } from '~/config/schema';
import { AddSongBody, UpdateSongStatusBody } from '~/models/song.model';

export const songRepository = {
	getSongs: async (userId: string) => {
		return models.Song.aggregate();
	},

	getSong: async (id: string) => {
		return models.Song.findById(id).lean();
	},

	getPreviousSong: async () => {
		return models.Song.findOne({ status: 'playing' }).lean();
	},

	addSong: async (addSongBody: AddSongBody) => {
		const song = await models.Song.create(addSongBody);
		return song.toObject();
	},

	deleteSong: async (id: string) => {
		return models.Song.deleteOne({ _id: id }).lean();
	},

	updateSongStatus: async (id: string, { status }: UpdateSongStatusBody) => {
		return models.Song.findOneAndUpdate(
			{ _id: id },
			{
				$set: {
					status,
				},
			},
			{ new: true }
		).lean();
	},
};
