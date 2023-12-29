import Elysia, { Static, t } from 'elysia';
import { UserModel } from '~/models/user.model';

export const SongModel = t.Object({
	id: t.Number(),
	videoId: t.String(),
	title: t.String(),
	createdAt: t.Date(),
	addedBy: t.Number(),
	thumbnail: t.String(),
});

export const AddSongBodyModel = t.Pick(SongModel, [
	'videoId',
	'title',
	'addedBy',
	'thumbnail',
]);

export const SongWithUserModel = t.Object({
	...SongModel.properties,
	addedBy: UserModel,
});

export type Song = Static<typeof SongModel>;
export type AddSongBody = Static<typeof AddSongBodyModel>;

export const songModel = new Elysia().model({
	song: SongModel,
	'song.add': AddSongBodyModel,
	songs: t.Array(SongWithUserModel),
});
