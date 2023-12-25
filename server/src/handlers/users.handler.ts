import Elysia, { t } from 'elysia';
import { userModel } from '~/models/user.model';
import { userRepository } from '~/repositories/user.repository';

export const usersHandler = new Elysia()
	.use(userModel)
	.get('/users', () => userRepository.getUsers(), {
		response: 'users',
		detail: {
			tags: ['users'],
		},
	})
	.get(
		'/users/:id',
		async ({ params }) => {
			const user = await userRepository.getUser(params.id);
			if (!user) {
				throw new Error('User not found');
			}
			console.log(user);
			return user;
		},
		{
			response: 'user',
			params: t.Object({
				id: t.Numeric(),
			}),
			detail: {
				tags: ['users'],
			},
		}
	)
	.post('/users', ({ body }) => userRepository.createUser(body), {
		body: 'user.create',
		detail: {
			tags: ['users'],
		},
	})
	.patch(
		'/users/:id',
		({ params, body }) => userRepository.updateUser(params.id, body),
		{
			body: 'user.update',
			params: t.Object({
				id: t.Numeric(),
			}),
			detail: {
				tags: ['users'],
			},
		}
	);
