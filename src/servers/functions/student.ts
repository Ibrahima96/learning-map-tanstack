import { studentSchema } from "#/lib/zod";
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
