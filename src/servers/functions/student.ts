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
