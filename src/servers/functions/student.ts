import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { studentSchema } from "#/lib/zod";
import { connectDB } from "../db/mongodb";
import Student from "../models/student.model";

/**
 * 1. CRÉATION D'UN ÉTUDIANT (POST)
 * .inputValidator : Vérifie que les données reçues respectent le schéma Zod.
 * Si les données sont invalides, la fonction s'arrête avant même d'arriver au handler.
 */
export const studentServerFn = createServerFn({ method: "POST" })
  .inputValidator(studentSchema)
  .handler(async ({ data }) => {
    // Toujours s'assurer que la DB est connectée
    await connectDB();

    // Création en base de données
    const student = await Student.create(data);

    return {
      success: true,
      id: student._id.toString(), // On retourne l'ID sous forme de chaîne de caractères
    };
  });

/**
 * 2. RÉCUPÉRATION DE TOUS LES ÉTUDIANTS (GET)
 * On utilise GET pour les lectures de données.
 */
export const getstudentServerFn = createServerFn({ method: "GET" }).handler(
  async () => {
    await connectDB();

    /**
     * .sort({ createdAt: -1 }) : Trie du plus récent au plus ancien.
     * .lean() : TRÈS IMPORTANT. Retourne des objets JS simples au lieu de documents Mongoose lourds.
     * Cela améliore les performances et évite les problèmes de sérialisation.
     */
    const students = await Student.find().sort({ createdAt: -1 }).lean();

    /**
     * SÉRIALISATION JSON
     * MongoDB utilise des types spéciaux (ObjectId, Date).
     * Pour les envoyer au navigateur via JSON, il faut les transformer en String/ISOString.
     */
    const serialized = students.map((s) => ({
      _id: s._id.toString(),
      name: s.name,
      age: s.age,
      classe: s.classe,
      createdAt: s.createdAt ? new Date(s.createdAt).toISOString() : null,
      updatedAt: s.updatedAt ? new Date(s.updatedAt).toISOString() : null,
    }));

    return {
      students: serialized,
    };
  },
);

/**
 * 3. SUPPRESSION D'UN ÉTUDIANT (POST)
 * On valide qu'on reçoit bien un objet contenant un ID string.
 */
export const deleteServerFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    await connectDB();

    // Suppression par ID
    await Student.findByIdAndDelete(data.id);

    return { success: true };
  });

/**
 * 4. RÉCUPÉRATION D'UN SEUL ÉTUDIANT (GET)
 */
export const getOneStudentServerFn = createServerFn({ method: "GET" })
    .inputValidator(z.object({ id: z.string() }))
    .handler(async ({ data }) => {
        await connectDB();

        const student = await Student.findById(data.id).lean();

        if (!student) {
            // Cette erreur pourra être attrapée côté client
            throw new Error("Student not found");
        }

        // Sérialisation du document unique
        const serialized = {
            _id: student._id.toString(),
            name: student.name,
            age: student.age,
            classe: student.classe,
            createdAt: student.createdAt ? new Date(student.createdAt).toISOString() : null,
            updatedAt: student.updatedAt ? new Date(student.updatedAt).toISOString() : null,
        };

        return { student: serialized };
    }); 
