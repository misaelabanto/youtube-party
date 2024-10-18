import mongoose from 'mongoose';
import { SongStatus } from '~/models/song.model';

export const SONG_QUEUE_PIPELINE = (statuses: SongStatus[], userId: string) => [
	{
		$match: {
			status: {
				$in: statuses,
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
];
