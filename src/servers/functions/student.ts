import { studentSchema } from "#/lib/zod";
import { createServerFn } from "@tanstack/react-start";
import { connectDB } from "../db/mongodb";
import Student from "../models/student.model";
import z from "zod";

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

const schemaId = z.object({
	id: z.string(),
});
export const getOneStudent = createServerFn({ method: "GET" })
	.inputValidator(schemaId)
	.handler(async ({ data }) => {
		await connectDB();
		const student = await Student.findById().lean();

		return {
			student: JSON.parse(JSON.stringify(student)),
		};
	});
