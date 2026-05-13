import { auth } from "#/lib/auth";
import { createFileRoute } from "@tanstack/react-router";
import { connectDB } from "#/servers/db/mongodb";

/**
 * Route API catch-all pour Better Auth.
 * Cette route gère toutes les requêtes d'authentification (login, register, session, etc.)
 */
export const Route = createFileRoute("/api/auth/$")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				// Assure la connexion à MongoDB avant de traiter la requête
				await connectDB();
				return await auth.handler(request);
			},
			POST: async ({ request }) => {
				await connectDB();
				return await auth.handler(request);
			},
		},
	},
});
