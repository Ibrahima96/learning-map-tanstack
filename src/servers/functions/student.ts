import { schemaEdit, schemaId, studentSchema } from "#/lib/zod";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import Student from "../models/student.model";
import { getCurrentLinkedUser } from "./current-user";

/**
 * Fonction serveur pour créer un nouvel étudiant.
 * Utilise studentSchema pour valider les données d'entrée.
 */
export const createStudentFn = createServerFn({ method: "POST" })
  .inputValidator(studentSchema)
  .handler(async ({ data }) => {
    const request = getRequest();
    const user = await getCurrentLinkedUser(request.headers);
    if (!user) throw new Error("Vous devez être connecté pour effectuer cette action.");

    // Création de l'étudiant lié au profil local de l'utilisateur connecté
    const student = await Student.create({
      ...data,
      userId: user._id
    });
    
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
    const request = getRequest();
    const user = await getCurrentLinkedUser(request.headers);
    if (!user) return { students: [] };

    // On ne récupère que les étudiants appartenant au profil local connecté
    const students = await Student.find({ userId: user._id }).sort({ createdAt: -1 }).lean();

    return {
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
    const request = getRequest();
    const user = await getCurrentLinkedUser(request.headers);
    if (!user) throw new Error("Non autorisé");
    
    // Recherche par ID et par userId pour garantir la propriété
    const student = await Student.findOne({ _id: data.id, userId: user._id }).populate("userId").lean();

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
    const request = getRequest();
    const user = await getCurrentLinkedUser(request.headers);
    if (!user) throw new Error("Non autorisé");
    const { name, age, classe } = data;
    
    // Mise à jour uniquement si l'étudiant appartient à l'utilisateur
    const student = await Student.findOneAndUpdate(
      { _id: data.id, userId: user._id }, 
      { name, age, classe }, 
      { new: true }
    ).lean();

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
    const request = getRequest();
    const user = await getCurrentLinkedUser(request.headers);
    if (!user) throw new Error("Non autorisé");
    
    // Suppression uniquement si l'étudiant appartient à l'utilisateur
    const student = await Student.findOneAndDelete({ _id: data.id, userId: user._id }).lean();

    return {
      success: true,
      student: JSON.parse(JSON.stringify(student)),
    };
  });
