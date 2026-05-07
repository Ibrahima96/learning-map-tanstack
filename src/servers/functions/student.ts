import { schemaEdit, schemaId, studentSchema } from "#/lib/zod";
import { createServerFn } from "@tanstack/react-start";
import { connectDB } from "../db/mongodb";
import Student from "../models/student.model";

/**
 * Fonction serveur pour créer un nouvel étudiant.
 * Utilise studentSchema pour valider les données d'entrée.
 */
export const createStudentFn = createServerFn({ method: "POST" })
  .inputValidator(studentSchema)
  .handler(async ({ data }) => {
    // Connexion à la base de données MongoDB
    await connectDB();

    // Création de l'étudiant dans la base de données
    const student = await Student.create(data);
    
    return {
      success: true,
      id: student._id.toString(),
    };
  });

/**
 * Récupère tous les étudiants enregistrés.
 * Triés par date de création décroissante (le plus récent en premier).
 */
export const getAllStudents = createServerFn({ method: "GET" }).handler(
  async () => {
    await connectDB();
    
    // Récupération de tous les documents, conversion en objet simple avec lean()
    const students = await Student.find().sort({ createdAt: -1 }).lean();

    return {
      // JSON.parse/stringify nécessaire pour sérialiser les types MongoDB (comme ObjectId) en JSON pur
      students: JSON.parse(JSON.stringify(students)),
    };
  },
);

/**
 * Récupère les détails d'un seul étudiant par son ID.
 */
export const getOneStudent = createServerFn({ method: "GET" })
  .inputValidator(schemaId)
  .handler(async ({ data }) => {
    await connectDB();
    
    // Recherche par ID
    const student = await Student.findById(data.id).lean();

    return {
      student: JSON.parse(JSON.stringify(student)),
    };
  });

/**
 * Met à jour les informations d'un étudiant existant.
 */
export const updatedStudent = createServerFn({ method: "POST" })
  .inputValidator(schemaEdit)
  .handler(async ({ data }) => {
    await connectDB();
    const { name, age, classe } = data;
    
    // Mise à jour via l'ID avec les nouvelles données
    const student = await Student.findByIdAndUpdate(data.id, {
      name,
      age,
      classe,
    }, { new: true }).lean(); // new: true pour retourner le document mis à jour

    return {
      success: true,
      student: JSON.parse(JSON.stringify(student)),
    };
  });

/**
 * Supprime définitivement un étudiant de la base de données.
 */
export const deletedStudentFn = createServerFn({ method: "POST" })
  .inputValidator(schemaId)
  .handler(async ({ data }) => {
    await connectDB();
    
    // Suppression par ID
    const student = await Student.findByIdAndDelete(data.id).lean();

    return {
      success: true,
      student: JSON.parse(JSON.stringify(student)),
    };
  });
