import { eq } from 'drizzle-orm';
import db from '~/config/database';
import * as schema from '~/config/schema';
import { CreateUserBody, User } from '~/models/user.model';

export const userRepository = {
	getUser: async (id: number) => {
		return db.get<User>(
			db.select().from(schema.users).where(eq(schema.users.id, id))
		);
	},

	getUsers: (): User[] => {
		return db.select().from(schema.users).all();
	},

	createUser: (createUserBody: CreateUserBody) => {
		return db.get<User>(
			db.insert(schema.users).values(createUserBody).returning()
		);
	},

	updateUser: (id: number, updateUserBody: Partial<User>) => {
		return db.get<User>(
			db
				.update(schema.users)
				.set(updateUserBody)
				.where(eq(schema.users.id, id))
				.returning()
		);
	},
};
