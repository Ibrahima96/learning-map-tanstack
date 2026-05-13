import { createAuthClient } from "better-auth/react";

/**
 * Client d'authentification pour le frontend.
 * Ce client est utilisé pour interagir avec le backend (connexion, déconnexion, récupération de session).
 */
export const authClient = createAuthClient({
	baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});
