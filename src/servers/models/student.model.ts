import mongoose, { type InferSchemaType } from "mongoose";

const { model, models, Schema } = mongoose;

const studentSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Le nom est obligatoire."],
			trim: true,
			minlength: [2, "Le nom doit contenir au moins 2 caracteres."],
			maxlength: [100, "Le nom ne peut pas depasser 100 caracteres."],
		},
		age: {
			type: Number,
			required: [true, "L'age est obligatoire."],
			min: [3, "L'age doit etre d'au moins 3 ans."],
			max: [120, "L'age ne peut pas depasser 120 ans."],
		},
		classe: {
			type: String,
			required: [true, "La classe est obligatoire."],
			trim: true,
			minlength: [1, "La classe est obligatoire."],
			maxlength: [50, "La classe ne peut pas depasser 50 caracteres."],
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

export type IStudent = InferSchemaType<typeof studentSchema> & {
	_id?: unknown;
};

const Student = models.Student ?? model<IStudent>("Student", studentSchema);

export default Student;
