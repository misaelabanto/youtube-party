import Elysia, { Static, t } from 'elysia';

export const UserModel = t.Object({
	id: t.Number(),
	name: t.String(),
});
export const CreateUserBodyModel = t.Pick(UserModel, ['name']);

export type User = Static<typeof UserModel>;
export type CreateUserBody = Static<typeof CreateUserBodyModel>;

export const userModel = new Elysia().model({
	user: UserModel,
	'user.create': CreateUserBodyModel,
	users: t.Array(UserModel),
});
