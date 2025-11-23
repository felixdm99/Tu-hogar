import { Request, Response, NextFunction } from "express";
import { verificarToken } from "../utils/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) =>{
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({ message: "token no proporcionado"});

        }
        const token = authHeader.split(" ")[1];
        const decoded = verificarToken(token);

        (req as any).user = decoded;
        next();
    }catch (error){
        return res.status(401).json({message: "token invalido"});
    }

};