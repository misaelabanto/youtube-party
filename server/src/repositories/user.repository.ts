import db from '~/config/database';
import { CreateUserBody, User } from '~/models/user.model';
import { $, type T$ } from '~/utils/$';

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
)`);

export const userRepository = {
	getUser: (id: number): User => {
		const user = db
			.query<User, [number]>('SELECT * FROM users WHERE id = ?')
			.get(id);
		if (!user) {
			throw new Error('User not found');
		}
		return user;
	},

	createUser: (createUserBody: CreateUserBody) => {
		return db
			.query<User, T$<CreateUserBody>>(
				'INSERT INTO users (name) VALUES ($name)'
			)
			.run($(createUserBody));
	},
};
