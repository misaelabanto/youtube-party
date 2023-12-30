import { models } from '~/config/schema';
import { CreateUserBody, User } from '~/models/user.model';

export const userRepository = {
	getUser: async (id: string) => {
		return models.User.findById(id);
	},

	getUsers: async () => {
		const users = await models.User.find().lean();
		return users;
	},

	createUser: (createUserBody: CreateUserBody) => {
		return models.User.create(createUserBody);
	},

	updateUser: (id: string, updateUserBody: Partial<User>) => {
		return models.User.updateOne({ _id: id }, updateUserBody);
	},
};
