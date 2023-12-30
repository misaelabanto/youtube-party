import Elysia, { Static, t } from 'elysia';
import { SongModel } from '~/models/song.model';
import { UserModel } from '~/models/user.model';

export enum VoteType {
	UP = 'up',
	DOWN = 'down',
}

export const VoteModel = t.Object({
	_id: t.Any(),
	song: t.Union([t.String(), SongModel]),
	user: t.Union([t.String(), UserModel]),
	createdAt: t.Date(),
	voteType: t.Enum(VoteType),
});
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
