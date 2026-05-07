import * as z from "zod";

/**
 * Schéma de validation pour la création d'un étudiant.
 * Utilisé à la fois côté client (formulaire) et côté serveur (inputValidator).
 */
export const studentSchema = z.object({
	name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
	age: z.coerce.number().min(1, "L'âge doit être supérieur à 0"),
	classe: z.string().min(1, "La classe est requise"),
});

/**
 * Schéma de validation pour les actions nécessitant uniquement un ID (ex: suppression, récupération).
 */
export const schemaId = z.object({
	id: z.string(),
});

/**
 * Schéma de validation pour la modification d'un étudiant.
 * Inclut l'ID obligatoire en plus des champs modifiables.
 */
export const schemaEdit = z.object({
	id: z.string(),
	name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
	age: z.coerce.number().min(1, "L'âge doit être supérieur à 0"),
	classe: z.string().min(1, "La classe est requise"),
});
