import { createFetch } from 'ofetch';

export const customOfetch = createFetch({
	defaults: {
		onResponseError({ error, response, options, request }) {
			console.error(
				`Error: ${options.method} ${request}. Response: ${JSON.stringify(
					response._data,
					null,
					2
				)}`
			);
		},
	},
});
