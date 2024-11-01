import { customOfetch } from '~/config/ofetch';
import { models } from '~/config/schema';
import { CurrentTrack, Track } from '~/interfaces/track';
import { userRepository } from '../repositories/user.repository';

setInterval(async () => {
	console.log('Checking current song');
	const currentSong = await spotifyService.getCurrentSong();
	if (!currentSong) {
		return;
	}
	if (currentSong.is_playing) {
		await models.Song.updateOne(
			{
				status: 'playing',
			},
			{
				status: 'played',
			}
		);
		await models.Song.updateOne(
			{
				videoId: currentSong.item.uri,
			},
			{
				status: 'playing',
			}
		);
	}
}, 30_000);

export const spotifyService = {
	async handlePlayerState(state: 'play' | 'pause'): Promise<void> {
		const accessToken = await this.getAccessToken();
		await customOfetch(`https://api.spotify.com/v1/me/player/${state}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	},

	async getRecommendations(): Promise<{ tracks: Track[] }> {
		const accessToken = await this.getAccessToken();
		const data = await customOfetch(
			'https://api.spotify.com/v1/recommendations',
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				query: {
					seed: '',
				},
			}
		);
		return data;
	},

	async getCurrentSong(): Promise<CurrentTrack> {
		const accessToken = await this.getAccessToken();
		const data = await customOfetch(
			'https://api.spotify.com/v1/me/player/currently-playing',
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		return data;
	},

	async previousSong(): Promise<void> {
		const accessToken = await this.getAccessToken();
		await customOfetch('https://api.spotify.com/v1/me/player/previous', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	},

	async nextSong(): Promise<void> {
		const accessToken = await this.getAccessToken();
		await customOfetch('https://api.spotify.com/v1/me/player/next', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	},

	async addToPlaylist(uri: string): Promise<void> {
		const accessToken = await this.getAccessToken();
		await customOfetch(
			`https://api.spotify.com/v1/playlists/${process.env.PLAYLIST_ID}/tracks`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				body: {
					uris: [uri],
				},
			}
		);
		await customOfetch(`https://api.spotify.com/v1/me/player/queue`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			query: {
				uri,
			},
		});
	},

	async searchSongs(query: string): Promise<{ tracks: { items: [] } }> {
		const accessToken = await this.getAccessToken();
		const data = await customOfetch('https://api.spotify.com/v1/search', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			query: {
				q: query,
				type: 'track',
				limit: '10',
			},
		});
		return data;
	},

	async refreshToken(): Promise<{ accessToken: string; expiresAt: Date }> {
		const admin = await userRepository.getAdmin();
		if (!admin) {
			throw new Error('Admin not found');
		}
		const url = new URL('https://accounts.spotify.com/api/token');
		const searchParams = new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: admin.auth?.refreshToken || '',
			client_id: Bun.env.SPOTIFY_CLIENT_ID || '',
			client_secret: Bun.env.SPOTIFY_CLIENT_SECRET || '',
		});
		const data = await customOfetch(url.toString(), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: searchParams.toString(),
		});
		await userRepository.updateUser(admin._id, {
			auth: {
				refreshToken: data.refresh_token || admin.auth?.refreshToken,
				accessToken: data.access_token,
				expiresAt: new Date(Date.now() + data.expires_in * 1000),
			},
		});
		return {
			accessToken: data.access_token,
			expiresAt: new Date(Date.now() + data.expires_in * 1000),
		};
	},

	getAccessToken(): Promise<string> {
		return new Promise(async (resolve, reject) => {
			const admin = await userRepository.getAdmin();
			if (!admin) {
				reject(new Error('Admin not found'));
				return;
			}
			if (admin.auth?.expiresAt && admin.auth.expiresAt < new Date()) {
				const { accessToken } = await this.refreshToken();
				resolve(accessToken);
			}
			resolve(admin.auth?.accessToken || '');
		});
	},
};
