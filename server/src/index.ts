import cors from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { searchHandler } from '~/handlers/search.handler';
import { songsHandler } from '~/handlers/songs.handler';
import { usersHandler } from '~/handlers/users.handler';
import { votesHandler } from '~/handlers/votes.handler';
import { wsHandler } from '~/handlers/ws.handler';
await import('~/config/database');

const app = new Elysia()
	.get('/', () => ({ message: 'Hello Elysia' }))
	.use(cors())
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
	.use(votesHandler)
	.use(wsHandler)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
