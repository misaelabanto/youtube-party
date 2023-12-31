import { models } from '~/config/schema';
import type { CreateVoteBody } from '~/models/vote.model';

export const voteRepository = {
	getVotes() {
		return models.Vote.find().lean();
	},
	create(createVoteBody: CreateVoteBody) {
		return models.Vote.findOneAndUpdate(
			{
				user: new Object(createVoteBody.user),
				song: new Object(createVoteBody.song),
			},
			{
				$set: {
					vote: createVoteBody.voteType,
				},
			},
			{ upsert: true, new: true }
		).lean();
	},
	delete(id: string) {
		return models.Vote.deleteOne({ _id: id });
	},
};
