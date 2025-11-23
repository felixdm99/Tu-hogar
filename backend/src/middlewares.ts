import { Request, Response } from "express";
import {NextFunction} from "express";
import Usuario from "./models/user.model";



export const isAdmin = async (req: Request, res: Response, next: NextFunction)=>{
    const email = req.headers["x-user-email"];
    if (!email) return res.status(401).send("No autorizado");

    const usuario = await Usuario.findOne({email});
    if (!usuario) return res.status(404).send ("usuario no encontrado!");

    if (usuario.role !== "admin") return res.status(403).send("acceso denegado!");

    next();
}

