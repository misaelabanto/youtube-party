import type { youtube_v3 } from '@googleapis/youtube';
import Elysia, { t } from 'elysia';

export const searchHandler = new Elysia().get(
	'/search',
	async ({ query }) => {
		const url = new URL('https://www.googleapis.com/youtube/v3/search');
		url.search = new URLSearchParams({
			part: 'snippet',
			q: query.q || '',
			key: process.env.YOUTUBE_API_KEY || '',
		}).toString();
		const response = await fetch(url.toString());
		const data =
			(await response.json()) as youtube_v3.Schema$SearchListResponse;
		return data.items;
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
