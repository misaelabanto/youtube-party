import { Elysia } from 'elysia';

export enum WSEvents {
	VOTE = 'vote',
	SONG = 'song',
}

export const wsHandler = new Elysia().ws('/ws', {
	open(ws) {
		ws.subscribe('party');
	},
	message(ws, message) {
		ws.send(message);
	},
});
