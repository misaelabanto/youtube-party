import Elysia, { t } from 'elysia';
import { songModel } from '~/models/song.model';
import { songRepository } from '~/repositories/song.repository';

export const songsHandler = new Elysia()
	.use(songModel)
	.get('/songs', () => songRepository.getSongs(), {
		response: 'songs',
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
			id: t.Number(),
		}),
		detail: {
			tags: ['songs'],
		},
	});
