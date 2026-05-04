import * as z from "zod";

export const studentSchema = z.object({
	name: z.string().min(2),
	age: z.coerce.number().min(1),
	classe: z.string(),
});

export const updateStudentSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  age: z.coerce.number(),
  classe: z.string(),
});