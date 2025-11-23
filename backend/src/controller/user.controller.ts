import { Request, Response } from "express";
import { createUserService, LoginUserService, getUserByEmailService, updateLastLoginService} from "../services/user.services"; 

export const registerUserController = async (req:Request, res: Response) =>{
    try{
        const data = req.body;

        if (!data.email || !data.password){
            return res.status(400).json({message: "Email y constraseña son obligatorios"})
        }

        const newUser = await createUserService(data);
        return res.status(201).json(newUser);
    } catch (error: any) {
        return res.status(400).json({ message: error.message});
    }
};

export const LoginUserController= async (req: Request, res: Response) =>{
    try{
        const {email, password} = req.body;

        const user = await LoginUserService( email, password);

        await updateLastLoginService(user._id);
        return res.json({message: "Login exitoso", user});
    } catch(error: any){
        return res.status(400).json({message: error.message});
    }
};

export const getUserByEmailController= async (req: Request, res: Response) =>{
    try{
        const email = req.params.email;
        const user= await getUserByEmailService(email);

        if(!user){
            return res.status(404).json({message: "Usuario no encontrado"});
        }
        return res.json(user);
    } catch(error: any){
        return res.status(400).json({message: error.message});
    }
};