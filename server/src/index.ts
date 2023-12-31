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
	.options('/*', ({ set }) => {
		set.headers['X-Powered-By'] = 'Elysia';
		set.headers['Access-Control-Allow-Origin'] = '*';
		set.headers['Access-Control-Allow-Methods'] = '*';
		set.headers['Access-Control-Allow-Headers'] = '*';
		set.headers['Access-Control-Allow-Credentials'] = 'true';
		set.headers['Expose-Headers'] = 'Content-Length';
	})
	.onAfterHandle(({ set, path, request }) => {
		set.headers['X-Powered-By'] = 'Elysia';
		set.headers['Access-Control-Allow-Origin'] = '*';
		set.headers['Access-Control-Allow-Methods'] = '*';
		set.headers['Access-Control-Allow-Headers'] = '*';
		set.headers['Access-Control-Allow-Credentials'] = 'true';
		set.headers['Expose-Headers'] = 'Content-Length';
		if (path.includes('votes') && request.method === 'POST') {
			app.server?.publish('party', 'vote');
		}
		if (path.includes('songs') && request.method === 'POST') {
			app.server?.publish('party', 'song');
		}
	})
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
	.onError(({ error, set }) => {
		set.headers['X-Powered-By'] = 'Elysia';
		set.headers['Access-Control-Allow-Origin'] = '*';
		set.headers['Access-Control-Allow-Methods'] = '*';
		set.headers['Access-Control-Allow-Headers'] = '*';
		set.headers['Access-Control-Allow-Credentials'] = 'true';
		set.headers['Expose-Headers'] = 'Content-Length';
		console.error(error);
		return error.message;
	})
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
