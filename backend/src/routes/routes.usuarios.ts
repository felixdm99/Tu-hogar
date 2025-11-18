import { Router } from "express";
import { crearUsuarioController } from "../controller/controller.usuario"; //TRAE EL CONTROLLER

const router = Router(); //CREA EL ROUTER

// Ruta para crear usuario
router.post("/new-user", crearUsuarioController);//DEFINE EL ENDPOINT

export default router;