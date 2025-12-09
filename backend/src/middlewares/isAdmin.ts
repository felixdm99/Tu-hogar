import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

export const isAdmin = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    // Asegurar que el JWT ya fue verificado
    if (!req.user || !req.user.id) {
      return res.status(403).json({ msg: "No autorizado" });
    }

    // Buscar el usuario en la base de datos
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    // Verificar rol
    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Acceso solo para administradores" });
    }

    // Todo ok → continuar
    next();

  } catch (error) {
    console.error("isAdmin error:", error);
    return res.status(500).json({ msg: "Error interno" });
  }
};
