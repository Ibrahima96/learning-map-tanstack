import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
let connectionPromise: Promise<typeof mongoose> | null = null;

export const connectDB = async () => {
	if (!MONGODB_URI) {
		throw new Error("MONGODB_URI est manquante.");
	}

	if (mongoose.connection.readyState === 1) {
		return mongoose.connection;
	}

	if (!connectionPromise) {
		connectionPromise = mongoose.connect(MONGODB_URI).then((client) => {
			console.log("MongoDB connected successfully");
			return client;
		});
	}

	return connectionPromise;
};

export default mongoose.connection;
