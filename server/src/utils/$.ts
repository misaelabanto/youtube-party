export type T$<U extends Record<string, any>> = {
	[K in keyof U as `$${string & K}`]?: U[K];
};

export const $ = (values: object): T$<Record<string, string>> => {
	const result: Record<string, any> = {};
	for (const [key, value] of Object.entries(values)) {
		result[`$${key}`] = value;
	}
	return result;
};
