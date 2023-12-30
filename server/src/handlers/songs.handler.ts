import Elysia, { t } from 'elysia';
import { songModel } from '~/models/song.model';
import { songRepository } from '~/repositories/song.repository';

export const songsHandler = new Elysia()
	.use(songModel)
	.get('/songs', ({ query }) => songRepository.getSongs(query.userId), {
		response: 'songs',
		query: t.Object({
			userId: t.String(),
		}),
		detail: {
			tags: ['songs'],
		},
	})
	.post('/songs', ({ body }) => songRepository.addSong(body), {
		body: 'song.add',
		detail: {
			tags: ['songs'],
		},
	})
	.delete('/songs/:id', ({ params }) => songRepository.deleteSong(params.id), {
		params: t.Object({
			id: t.String(),
		}),
		detail: {
			tags: ['songs'],
		},
	});
