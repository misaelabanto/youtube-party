import Elysia, { Static, t } from 'elysia';

export const UserModel = t.Object(
	{
		_id: t.Any(),
		name: t.String({ minLength: 1 }),
		emoji: t.String(),
	},
	{
		$id: 'User',
	}
);
export const CreateUserBodyModel = t.Pick(UserModel, ['name', 'emoji']);
export const UpdateUserBodyModel = t.Partial(t.Omit(UserModel, ['_id']));

export type User = Static<typeof UserModel>;
export type CreateUserBody = Static<typeof CreateUserBodyModel>;

export const userModel = new Elysia().model({
	user: UserModel,
	'user.create': CreateUserBodyModel,
	'user.update': UpdateUserBodyModel,
	users: t.Array(UserModel),
});
