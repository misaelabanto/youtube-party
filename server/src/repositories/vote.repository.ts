import { models } from '~/config/schema';
import type { CreateVoteBody } from '~/models/vote.model';

export const voteRepository = {
	getVotes() {
		return models.Vote.find().lean();
	},
	create(createVoteBody: CreateVoteBody) {
		return models.Vote.findOneAndUpdate(
			{
				user: createVoteBody.user,
				song: createVoteBody.song,
			},
			createVoteBody,
			{ upsert: true, new: true }
		).lean();
	},
	delete(id: string) {
		return models.Vote.deleteOne({ _id: id });
	},
};
