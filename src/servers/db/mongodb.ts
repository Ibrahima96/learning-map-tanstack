import mongoose from "mongoose";

// Récupération de l'URL de connexion depuis les variables d'environnement
const MONGODB_URI = process.env.MONGODB_URI;

// Mise en cache de la promesse de connexion pour éviter les connexions multiples en mode Serverless/Fastify
let connectionPromise: Promise<typeof mongoose> | null = null;

/**
 * Fonction de connexion à la base de données MongoDB via Mongoose.
 * Gère le cache de connexion pour optimiser les performances.
 */
export const connectDB = async () => {
	if (!MONGODB_URI) {
		throw new Error("La variable d'environnement MONGODB_URI est manquante.");
	}

	// Vérifie si la connexion est déjà établie (readyState 1 = connected)
	if (mongoose.connection.readyState === 1) {
		return mongoose.connection;
	}

	// Si aucune connexion n'est en cours, on l'initialise
	if (!connectionPromise) {
		connectionPromise = mongoose.connect(MONGODB_URI).then((client) => {
			console.log("MongoDB connecté avec succès");
			return client;
		});
	}

	return connectionPromise;
};

export default mongoose.connection;
