import Elysia, { Static, t } from 'elysia';

export enum VoteType {
	UP = 'up',
	DOWN = 'down',
}

export const VoteModel = t.Object(
	{
		_id: t.Any(),
		song: t.Any(),
		user: t.Any(),
		createdAt: t.Date(),
		voteType: t.Enum(VoteType),
	},
	{
		$id: 'Vote',
	}
);

export const CreateVoteBodyModel = t.Pick(VoteModel, [
	'user',
	'song',
	'voteType',
]);

export type Vote = Static<typeof VoteModel>;
export type CreateVoteBody = Static<typeof CreateVoteBodyModel>;

export const voteModel = new Elysia().model({
	vote: VoteModel,
	'vote.create': CreateVoteBodyModel,
	votes: t.Array(VoteModel),
});
