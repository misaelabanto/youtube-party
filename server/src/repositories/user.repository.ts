import { eq } from 'drizzle-orm';
import db from '~/config/database';
import * as schema from '~/config/schema';
import { CreateUserBody, User } from '~/models/user.model';

export const userRepository = {
	getUser: async (id: number) => {
		return db.query.users.findFirst({
			where: eq(schema.users.id, id),
		});
	},

	getUsers: () => {
		return db.query.users.findMany();
	},

	createUser: (createUserBody: CreateUserBody) => {
		return db.insert(schema.users).values(createUserBody).returning();
	},

	updateUser: (id: number, updateUserBody: Partial<User>) => {
		return db
			.update(schema.users)
			.set(updateUserBody)
			.where(eq(schema.users.id, id))
			.returning();
	},
};
