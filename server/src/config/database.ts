import * as mongoose from 'mongoose';

await mongoose.connect(process.env.DATABASE_URL!, {
	connectTimeoutMS: 10000,
});
