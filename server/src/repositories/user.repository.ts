import { models } from '~/config/schema';
import { CreateUserBody, User } from '~/models/user.model';

export const userRepository = {
	getAdmin: async () => {
		return models.User.findOne({ role: 'admin' }).lean();
	},

	getUser: async (id: string) => {
		return models.User.findById(id).lean();
	},

	getUsers: async () => {
		const users = await models.User.find().select('-auth').lean();
		return users;
	},

	createUser: async (createUserBody: CreateUserBody) => {
		const user = await models.User.create(createUserBody);
		return user.toObject();
	},

	updateUser: (id: string, updateUserBody: Partial<User>) => {
		return models.User.updateOne({ _id: id }, updateUserBody).lean();
	},
};
