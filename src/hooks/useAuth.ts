import { authClient } from "#/lib/auth-client";

export function useAuth() {
	const { data: session, isPending, error } = authClient.useSession();

	const signOut = async () => {
		await authClient.signOut();
	};

	const isAuthenticated = !!session && !isPending;

	return {
		session,
		isPending,
		error,
		isAuthenticated,
		signOut,
	};
}
