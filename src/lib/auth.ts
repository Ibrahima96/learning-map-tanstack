import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { MongoClient } from "mongodb";

/**
 * Initialisation du client MongoDB natif pour Better Auth.
 * Better Auth utilise le driver natif plutôt que l'ODM Mongoose.
 */
const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db();

/**
 * Configuration de Better Auth.
 * Le plugin `tanstackStartCookies` est essentiel pour le fonctionnement des sessions
 * dans l'architecture SSR de TanStack Start.
 */
export const auth = betterAuth({
	database: mongodbAdapter(db),
	secret: process.env.BETTER_AUTH_SECRET!,
	baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
	plugins: [tanstackStartCookies()],
	emailAndPassword: {
		enabled: true,
	},
});


