import Elysia, { t } from 'elysia';
import { spotifyService } from '~/services/spotify.service';

export const searchHandler = new Elysia().get(
	'/search',
	async ({ query }) => {
		const response = await spotifyService.searchSongs(query.q);
		return response.tracks.items;
	},
	{
		query: t.Object({
			q: t.String(),
		}),
		detail: {
			tags: ['search'],
		},
	}
);
