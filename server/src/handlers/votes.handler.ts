import Elysia from 'elysia';
import { voteModel } from '~/models/vote.model';
import { voteRepository } from '~/repositories/vote.repository';

export const votesHandler = new Elysia()
	.use(voteModel)
	.get('/votes', () => voteRepository.getVotes(), {
		response: 'votes',
		detail: {
			tags: ['votes'],
		},
	})
	.post('/votes', ({ body }) => voteRepository.create(body), {
		body: 'vote.create',
		response: 'vote',
		detail: {
			tags: ['votes'],
		},
	});
