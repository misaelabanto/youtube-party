import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { searchHandler } from '~/handlers/search.handler';
import { songsHandler } from '~/handlers/songs.handler';
import { usersHandler } from '~/handlers/users.handler';

const app = new Elysia()
	.get('/', () => ({ message: 'Hello Elysia' }))
	.use(
		swagger({
			documentation: {
				info: {
					title: 'Youtube Party API',
					description: 'API Documentation',
					version: '1.0.0',
				},
			},
		})
	)
	.use(searchHandler)
	.use(songsHandler)
	.use(usersHandler)
	.onError(({ error }) => ({ message: error.message }))
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
