import { Request, Response } from "express";
import { createUserService, LoginUserService, getUserByEmailService, updateLastLoginService } from "../services/user.services";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    if (!data.email || !data.password) {
      return res.status(400).json({ message: "Email y constraseña son obligatorios" })
    }

    const newUser = await createUserService(data);
    return res.status(201).json(newUser);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const LoginUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "Usuario no encontrado" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(400).json({ msg: "Contraseña incorrecta" });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      "SECRET_SUPER_SEGURO", // luego lo pasamos a .env
      { expiresIn: "7d" }
    );

    return res.json({
      msg: "Inicio de sesión exitoso",
      token,
      user
    });
  } catch (err) {
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

export const getUserByEmailController = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const user = await getUserByEmailService(email);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.json(user);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};