import { createServerFn } from "@tanstack/react-start";
import { studentSchema } from "#/lib/zod";
import { connectDB } from "../db/mongodb";
import Student from "../models/student.model";

export const studentServerFn = createServerFn({ method: "POST" })
  .inputValidator(studentSchema)
  .handler(async ({ data }) => {
    await connectDB();

    const student = await Student.create(data);

    return {
      success: true,
      id: student._id.toString(),
    };
  });
export const getstudentServerFn = createServerFn({ method: "GET" }).handler(
  async () => {
    await connectDB();

    const students = await Student.find().sort({ createdAt: -1 }).lean();

    // const lastStudent = students[0]; // le plus récent (premier après tri DESC)

    // Sérialiser les ObjectId et les dates en primitives simples
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
