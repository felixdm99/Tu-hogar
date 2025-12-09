import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ msg: "Token requerido" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "SECRET_SUPER_SEGURO");

    req.user = decoded; // Añadimos los datos del usuario al request

    next(); // seguir a la ruta protegida

  } catch (error) {
    return res.status(401).json({ msg: "Token inválido o expirado" });
  }
};
