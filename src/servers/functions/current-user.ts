import { auth } from "#/lib/auth";
import { connectDB } from "../db/mongodb";
import User from "../models/user.model";

type SessionUser = {
	id: string;
	name?: string | null;
	email?: string | null;
};

export async function getLinkedUser(sessionUser: SessionUser) {
	if (!sessionUser.email) {
		throw new Error("Impossible de lier le profil utilisateur sans email.");
	}

	await connectDB();

	const user = await User.findOneAndUpdate(
		{ authUserId: sessionUser.id },
		{
			$setOnInsert: {
				authUserId: sessionUser.id,
				name: sessionUser.name ?? "Utilisateur",
				email: sessionUser.email,
			},
		},
		{
			upsert: true,
			new: true,
			setDefaultsOnInsert: true,
		},
	);

	if (!user) {
		throw new Error("Profil utilisateur introuvable.");
	}

	return user;
}

export async function getCurrentLinkedUser(headers: Headers) {
	const session = await auth.api.getSession({ headers });
	if (!session) {
		return null;
	}

	return getLinkedUser(session.user);
}
