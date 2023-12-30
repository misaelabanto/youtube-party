import Elysia, { Static, t } from 'elysia';
import { UserModel } from '~/models/user.model';

export const SongModel = t.Object(
	{
		_id: t.Any(),
		videoId: t.String(),
		title: t.String(),
		createdAt: t.Date(),
		addedBy: t.Union([t.String(), UserModel]),
		thumbnail: t.String(),
	},
	{
		$id: 'Song',
	}
);

export const AddSongBodyModel = t.Pick(SongModel, [
	'videoId',
	'title',
	'addedBy',
	'thumbnail',
]);

export type Song = Static<typeof SongModel>;
export type AddSongBody = Static<typeof AddSongBodyModel>;

export const songModel = new Elysia().model({
	song: SongModel,
	'song.add': AddSongBodyModel,
	songs: t.Array(SongModel),
});
