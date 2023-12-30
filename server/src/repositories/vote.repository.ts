import { models } from '~/config/schema';
import type { CreateVoteBody } from '~/models/vote.model';

export const voteRepository = {
	getVotes() {
		return models.Vote.find().populate('user').populate('song');
	},
	create(createVoteBody: CreateVoteBody) {
		return models.Vote.findOneAndUpdate(
			{
				user: createVoteBody.user,
				song: createVoteBody.song,
			},
			createVoteBody,
			{ upsert: true, new: true }
		)
			.populate('user')
			.populate('song');
	},
	delete(id: string) {
		return models.Vote.deleteOne({ _id: id });
	},
};
