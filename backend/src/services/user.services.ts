import User, { IUser } from "../models/user.model";
import mongoose from "mongoose";
import bcrypt from "bcrypt";


export const createUserService = async (data: Partial<IUser>) => {
	const userExists = await User.findOne({ email: data.email });
	if (userExists) {
		throw new Error("El usuario ya existe");
	}

	const newUser = new User(data);
	return await newUser.save();
};

export const getUserByEmailService = async (email: string) => {
	return await User.findOne({ email });
};

export const LoginUserService = async (email: string, password: string) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error("Usuario no encontrado");
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch){
		throw new Error("contraseña incorrecta")
	}

	return user;
};

export const updateLastLoginService = async (
	userId: mongoose.Types.ObjectId
) => {
	return await User.findByIdAndUpdate(
		userId,
		{ lastLogin: new Date() },
		{ new: true }
	);
};
