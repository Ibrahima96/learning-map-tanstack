import {type InferSchemaType, model, models, Schema } from "mongoose";

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
},{timestamps:true});

export type IUser = InferSchemaType<typeof userSchema>;
const User = models.User ?? model<IUser>("User", userSchema);

export default User;
