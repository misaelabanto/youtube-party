import mongoose from 'mongoose';
import { models } from '~/config/schema';
import { AddSongBody, UpdateSongStatusBody } from '~/models/song.model';

export const songRepository = {
	getSongs: async (userId: string) => {
		return models.Song.aggregate([
			{
				$match: {
					status: {
						$in: ['pending', 'playing'],
					},
				},
			},
			{
				$lookup: {
					from: 'votes',
					localField: '_id',
					foreignField: 'song',
					as: 'votes',
				},
			},
			{
				$addFields: {
					upVotes: {
						$size: {
							$filter: {
								input: '$votes',
								as: 'vote',
								cond: {
									$eq: ['$$vote.voteType', 'up'],
								},
							},
						},
					},
					downVotes: {
						$size: {
							$filter: {
								input: '$votes',
								as: 'vote',
								cond: {
									$eq: ['$$vote.voteType', 'down'],
								},
							},
						},
					},
					userUpVoted: {
						$and: [
							{
								$in: [new mongoose.Types.ObjectId(userId), '$votes.user'],
							},
							{
								$in: ['up', '$votes.voteType'],
							},
						],
					},
					userDownVoted: {
						$and: [
							{
								$in: [new mongoose.Types.ObjectId(userId), '$votes.user'],
							},
							{
								$in: ['down', '$votes.voteType'],
							},
						],
					},
					playing: {
						$eq: ['$status', 'playing'],
					},
				},
			},
			{
				$lookup: {
					from: 'users',
					localField: 'addedBy',
					foreignField: '_id',
					as: 'addedBy',
				},
			},
			{
				$set: {
					addedBy: {
						$first: '$addedBy',
					},
				},
			},
			{
				$unset: ['votes'],
			},
			{
				$sort: {
					playing: -1,
					upVotes: -1,
					downVotes: 1,
					createdAt: 1,
				},
			},
		]);
	},

	getSong: async (id: string) => {
		return models.Song.findById(id);
	},

	addSong: async (addSongBody: AddSongBody) => {
		return models.Song.create(addSongBody);
	},

	deleteSong: async (id: string) => {
		return models.Song.deleteOne({ _id: id });
	},

	updateSongStatus: async (id: string, { status }: UpdateSongStatusBody) => {
		return models.Song.findOneAndUpdate(
			{ _id: id },
			{
				$set: {
					status,
				},
			},
			{ new: true }
		);
	},
};
