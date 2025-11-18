import { Request, Response } from "express";
import { crearUsuarioService } from "../services/services.usuario"; //TRAE LA FUNCION DEL SERVICE

export const crearUsuarioController = async(req: Request, res: Response) =>{
    try{
        const{nombre, apellido, email, password, role} = req.body;
        if (!nombre || !apellido || !email|| !password|| !role){
            return res.status(400).send("faltan datos");
        }
        const nuevoUsuario= await crearUsuarioService({ //LLAMAMOS AL SERVICE
            nombre,
            apellido,
            email,
            password,
            role
        });

        res.status(201).json({
            message: "usuario creado correctamente",
            usuario: nuevoUsuario,
    });
    }catch (error:any){
        if (error.code ===11000){
            res.status(400).send("el mail ya esta registrado");
        }
        console.error(error);
        res.status(500).json({ error: "Error al crear usuario" });
        }
    };