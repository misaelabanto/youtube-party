import Elysia, { t } from 'elysia';
import { customOfetch } from '~/config/ofetch';
import { spotifyService } from '~/services/spotify.service';

export const authHandler = new Elysia()
	.post(
		'/auth',
		async () => {
			const url = new URL('https://accounts.spotify.com/authorize');
			const searchParams = new URLSearchParams({
				response_type: 'code',
				client_id: Bun.env.SPOTIFY_CLIENT_ID!,
				scope:
					'app-remote-control user-modify-playback-state user-read-playback-state streaming user-read-email user-read-private playlist-modify-public playlist-modify-private',
				redirect_uri: 'https://party.misaelabanto.com/callback',
			});
			url.search = searchParams.toString();
			return {
				authorizationUrl: url,
			};
		},
		{
			detail: {
				tags: ['auth'],
			},
		}
	)
	.post('/auth/token', async () => {
		return {
			accessToken: await spotifyService.getAccessToken(),
		};
	})
	.get(
		'/auth/callback',
		async ({ query }) => {
			const code = query.code;
			const url = new URL('https://accounts.spotify.com/api/token');
			const searchParams = new URLSearchParams({
				grant_type: 'authorization_code',
				code,
				redirect_uri: 'https://party.misaelabanto.com/callback',
				client_id: Bun.env.SPOTIFY_CLIENT_ID!,
				client_secret: Bun.env.SPOTIFY_CLIENT_SECRET!,
			});
			url.search = searchParams.toString();
			const data = await customOfetch(url.toString(), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});
			return data;
		},
		{
			query: t.Object({
				code: t.String(),
				state: t.Optional(t.String()),
			}),
		}
	);
