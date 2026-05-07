import { schemaEdit, schemaId, studentSchema } from "#/lib/zod";
import { createServerFn } from "@tanstack/react-start";
import { connectDB } from "../db/mongodb";
import Student from "../models/student.model";

export const createStudentFn = createServerFn({ method: "POST" })
  .inputValidator(studentSchema)
  .handler(async ({ data }) => {
    await connectDB();

    const student = await Student.create(data);
    return {
      success: true,
      id: student._id.toString(),
    };
  });

//recuperation des enregistrer

export const getAllStudents = createServerFn({ method: "GET" }).handler(
  async () => {
    await connectDB();
    const students = await Student.find().sort({ createdAt: -1 }).lean();

    return {
      students: JSON.parse(JSON.stringify(students)),
    };
  },
);

// /recuperation les details

export const getOneStudent = createServerFn({ method: "GET" })
  .inputValidator(schemaId)
  .handler(async ({ data }) => {
    await connectDB();
    const student = await Student.findById(data.id).lean();

    return {
      student: JSON.parse(JSON.stringify(student)),
    };
  });

//updated

export const updatedStudent = createServerFn({ method: "POST" })
  .inputValidator(schemaEdit)
  .handler(async ({ data }) => {
    await connectDB();
    const { name, age, classe } = data;
    const student = await Student.findByIdAndUpdate(data.id, {
      name,
      age,
      classe,
    }).lean();

    return {
      success: true,
      student: JSON.parse(JSON.stringify(student)),
    };
  });
