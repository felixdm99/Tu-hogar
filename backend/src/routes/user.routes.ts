import { Router } from "express";
import { registerUserController, LoginUserController, getUserByEmailController } from "../controller/controller.usuario";

const router = Router()
router.post("/register", registerUserController);

router.post("/login", LoginUserController);

router.get("/email", getUserByEmailController);

export default router;