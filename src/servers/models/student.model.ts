import mongoose, { type InferSchemaType } from "mongoose";

const { model, models, Schema } = mongoose;

/**
 * Définition du schéma Mongoose pour un Étudiant.
 * Ce schéma définit la structure des documents dans la collection "students" de MongoDB.
 */
const studentSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Le nom est obligatoire."],
			trim: true,
			minlength: [2, "Le nom doit contenir au moins 2 caractères."],
			maxlength: [100, "Le nom ne peut pas dépasser 100 caractères."],
		},
		age: {
			type: Number,
			required: [true, "L'âge est obligatoire."],
			min: [3, "L'âge doit être d'au moins 3 ans."],
			max: [120, "L'âge ne peut pas dépasser 120 ans."],
		},
		classe: {
			type: String,
			required: [true, "La classe est obligatoire."],
			trim: true,
			minlength: [1, "La classe est obligatoire."],
			maxlength: [50, "La classe ne peut pas dépasser 50 caractères."],
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "L'identifiant de l'utilisateur est obligatoire."],
			index: true,
		},
	},
	{
		// Ajoute automatiquement les champs 'createdAt' et 'updatedAt'
		timestamps: true,
		// Désactive le champ __v généré par Mongoose
		versionKey: false,
	},
);

// Extraction du type TypeScript à partir du schéma Mongoose
export type IStudent = InferSchemaType<typeof studentSchema>;

/**
 * Création ou récupération du modèle Student.
 * On vérifie d'abord si le modèle existe déjà dans 'models' pour éviter les erreurs de re-déclaration en mode dev (HMR).
 */
const Student = models.Student ?? model<IStudent>("Student", studentSchema);

export default Student;
