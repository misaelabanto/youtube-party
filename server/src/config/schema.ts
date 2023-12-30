import * as mongoose from 'mongoose';
import type { Song } from '~/models/song.model';
import type { User } from '~/models/user.model';
import { Vote } from '~/models/vote.model';

const songSchema = new mongoose.Schema<Song>(
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

const SongModel = mongoose.model('Song', songSchema);

const userSchema = new mongoose.Schema<User>(
	{
		name: String,
		emoji: String,
	},
	{
		versionKey: false,
	}
);

const UserModel = mongoose.model('User', userSchema);

const voteSchema = new mongoose.Schema<Vote>(
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

const VoteModel = mongoose.model('Vote', voteSchema);

export const models = {
	Song: SongModel,
	User: UserModel,
	Vote: VoteModel,
};
