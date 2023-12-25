import Elysia, { Static, t } from 'elysia';

export const UserModel = t.Object({
	id: t.Number(),
	name: t.String({ minLength: 1 }),
	emoji: t.String(),
});
export const CreateUserBodyModel = t.Pick(UserModel, ['name', 'emoji']);
export const UpdateUserBodyModel = t.Partial(t.Omit(UserModel, ['id']));

export type User = Static<typeof UserModel>;
export type CreateUserBody = Static<typeof CreateUserBodyModel>;

export const userModel = new Elysia().model({
	user: UserModel,
	'user.create': CreateUserBodyModel,
	'user.update': UpdateUserBodyModel,
	users: t.Array(UserModel),
});
