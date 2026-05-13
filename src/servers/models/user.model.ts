import mongoose, { type InferSchemaType } from "mongoose";

const { model, models, Schema } = mongoose;

const userSchema = new Schema({
	authUserId: {
		type: String,
		required: true,
		unique: true,
		index: true,
	},
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},
}, {
	timestamps: true,
	toJSON: { virtuals: true },
	toObject: { virtuals: true },
});

userSchema.virtual("students", {
	ref: "Student",
	localField: "_id",
	foreignField: "userId",
});

export type IUser = InferSchemaType<typeof userSchema>;
const User = models.User ?? model<IUser>("User", userSchema);

export default User;
