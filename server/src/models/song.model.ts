import Elysia, { Static, t } from 'elysia';

export const SongModel = t.Object({
	id: t.String(),
	title: t.String(),
	addedAt: t.Number(),
	upVotes: t.Number(),
	downVotes: t.Number(),
	addedBy: t.Number(),
});

export const AddSongBodyModel = t.Pick(SongModel, ['id', 'title', 'addedBy']);

export type Song = Static<typeof SongModel>;
export type AddSongBody = Static<typeof AddSongBodyModel>;

export const songModel = new Elysia().model({
	song: SongModel,
	'song.add': AddSongBodyModel,
	songs: t.Array(SongModel),
});
