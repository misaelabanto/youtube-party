import { songRepository } from '~/repositories/song.repository';
import { spotifyService } from '~/services/spotify.service';

export class QueueManager {
	private static manager?: QueueManager;

	private timer: number;

	static getInstance() {
		if (!this.manager) {
			this.manager = new QueueManager();
		}
		return new QueueManager();
	}

	private constructor() {
		this.timer = 0;

		setInterval(async () => {
			if (this.timer) {
				return;
			}
			const currentSong = await spotifyService.getCurrentSong();
			if (!currentSong) {
				return;
			}
			if (currentSong.is_playing) {
				setTimeout(async () => {
					const queue = await songRepository.getSongs(
						new Object(currentSong.item.id).toString()
					);
					const nextSong = queue.find(song => song.status === 'pending');
					if (nextSong) {
						// await spotifyService.nextSong(nextSong.uri);
					}
				}, (currentSong.progress_ms ?? 0) - currentSong.item.duration_ms - 100);
			}
		}, 30_000);
	}
}
