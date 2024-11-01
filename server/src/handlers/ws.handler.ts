import { Elysia, t } from 'elysia';
import { spotifyService } from '~/services/spotify.service';

export enum WSEvents {
	VOTE = 'vote',
	SONG = 'song',
	NEXT = 'next',
	PREVIOUS = 'previous',
	PAUSE = 'pause',
	PLAY = 'play',
	PING = 'ping',
}

export const wsHandler = new Elysia().ws('/ws', {
	body: t.Enum(WSEvents),
	open(ws) {
		ws.subscribe('party');
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
			if (message === WSEvents.NEXT) {
				spotifyService.nextSong();
			}
			if (message === WSEvents.PREVIOUS) {
				spotifyService.previousSong();
			}
			if (message === WSEvents.PAUSE) {
				spotifyService.handlePlayerState('pause');
			}
			if (message === WSEvents.PLAY) {
				spotifyService.handlePlayerState('play');
			}
		} else {
			ws.send(message);
		}
	},
});
