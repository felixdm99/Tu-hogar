import User, { IUser } from "../models/user.model";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { generarToken } from "../utils/jwt";

export const createUserService = async (data: Partial<IUser>) => {
	const userExists = await User.findOne({ email: data.email });
	if (userExists) {
		throw new Error("El usuario ya existe");
	}
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(data.password!, salt);
	data.password = hashedPassword


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
	}const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error("Contraseña incorrecta");
	}

    const token = generarToken({
        id: user._id,
        role: user.role,
        email: user.email,
    });

    return { user, token };
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
