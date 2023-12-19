import Elysia, { t } from 'elysia';
import { userModel } from '~/models/user.model';
import { userRepository } from '~/repositories/user.repository';

export const usersHandler = new Elysia()
	.use(userModel)
	.get('/users/:id', ({ params }) => userRepository.getUser(params.id), {
		response: 'user',
		params: t.Object({
			id: t.Numeric(),
		}),
		detail: {
			tags: ['users'],
		},
	})
	.post('/users', ({ body }) => userRepository.createUser(body), {
		body: 'user.create',
		detail: {
			tags: ['users'],
		},
	});
