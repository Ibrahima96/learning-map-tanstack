import { studentSchema } from "#/lib/zod";
import { createServerFn } from "@tanstack/react-start";
import { connectDB } from "../db/mongodb";
import Student from "../models/student.model";

export const createStudentFn = createServerFn({ method: "POST" })
	.inputValidator(studentSchema)
	.handler(async ({ data }) => {
		await connectDB();

		const student = await Student.create({data});
		return {
			student,
			_id: student._id.toString(),
		};
	});
