import * as mongoose from 'mongoose';
import type { Song } from '~/models/song.model';
import type { User } from '~/models/user.model';
import { Vote } from '~/models/vote.model';

const songSchema = new mongoose.Schema(
	{
		videoId: String,
		title: String,
		createdAt: {
			type: Date,
			default: Date.now,
		},
		addedBy: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'User',
		},
		thumbnail: String,
		status: {
			type: String,
			enum: ['pending', 'playing', 'played'],
			default: 'pending',
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

songSchema.virtual('upVotes', {
	ref: 'Vote',
	count: true,
	localField: '_id',
	foreignField: 'song',
	match: {
		voteType: 'up',
	},
});

songSchema.virtual('downVotes', {
	ref: 'Vote',
	count: true,
	localField: '_id',
	foreignField: 'song',
	match: {
		voteType: 'down',
	},
});

const SongModel = mongoose.model<Song>('Song', songSchema);

const userSchema = new mongoose.Schema(
	{
		name: String,
		emoji: String,
		role: {
			type: String,
			enum: ['admin', 'user'],
			default: 'user',
		},
		auth: {
			accessToken: String,
			refreshToken: String,
			expiresAt: Date,
		},
	},
	{
		versionKey: false,
	}
);

const UserModel = mongoose.model<User>('User', userSchema);

const voteSchema = new mongoose.Schema(
	{
		song: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'Song',
		},
		user: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'User',
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		voteType: {
			type: String,
			enum: ['up', 'down'],
		},
	},
	{
		versionKey: false,
	}
);

const VoteModel = mongoose.model<Vote>('Vote', voteSchema);

export const models = {
	Song: SongModel,
	User: UserModel,
	Vote: VoteModel,
};
