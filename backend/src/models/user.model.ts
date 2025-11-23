import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";


export interface IUser extends Document {
	_id: mongoose.Types.ObjectId;
	email: string;
	password: string;
	profile: {
		firstName: string;
		lastName: string;
		phone?: string;
		avatar?: string;
	};
	role: "customer" | "admin" | "moderator";
	addresses: Array<{
		type: string;
		street: string;
		city: string;
		state: string;
		zipCode: string;
		county: string;
		isDefault: boolean;
	}>;
	wishlist: mongoose.Types.ObjectId[]
	createdAt: Date;
	updatedAt: Date;
	lastlogin?: Date;
	isActive: boolean;
}


const UserSchema: Schema = new Schema<IUser>(
	{
		email: String,
		password: String,
		profile:{
			firstName: String,
			lastName: String,
			phone: String,
			avatar: String,
		},
		role:{
			type: String,
			default: "customer",
		},
		addresses: [
			{
				type: {type: String},
				street: String,
				city: String,
				state: String,
				zipCode: String,
				country: String,
				isDefault: Boolean,
			},
		],
		wishlist: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
		],
		lastlogin: Date,
		isActive:{
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }

);
UserSchema.pre("save", async function (next){
	const user = this as unknown as IUser;

	if (!user.isModified("password")){
		return next();
	}
	try{
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);
		next();
	} catch(error){
		next(error as any);
	}
});


const User = mongoose.model<IUser>("User", UserSchema);
export default User;