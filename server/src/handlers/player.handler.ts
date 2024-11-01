import Elysia, { t } from 'elysia';
import { spotifyService } from '~/services/spotify.service';

export const playerHandler = new Elysia()
	.get('/player/current', async () => {
		return spotifyService.getCurrentSong();
	})
	.post(
		'/player/state',
		async ({ body }) => {
			await spotifyService.handlePlayerState(body.state);
		},
		{
			body: t.Object({
				state: t.Enum({
					play: 'play',
					pause: 'pause',
				}),
			}),
		}
	);
