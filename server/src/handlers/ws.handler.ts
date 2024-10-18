import { Elysia } from 'elysia';

export enum WSEvents {
	VOTE = 'vote',
	SONG = 'song',
	NEXT = 'next',
	PREVIOUS = 'previous',
	PAUSE = 'pause',
	PLAY = 'play',
}

export const wsHandler = new Elysia().ws('/ws', {
	open(ws) {
		ws.subscribe('party');
		console.log('khe');
	},
	message(ws, message) {
		if (
			[
				WSEvents.NEXT,
				WSEvents.PREVIOUS,
				WSEvents.PAUSE,
				WSEvents.PLAY,
			].includes(message as WSEvents)
		) {
			ws.publish('party', message);
			console.log('message', message);
		} else {
			ws.send(message);
		}
	},
});
