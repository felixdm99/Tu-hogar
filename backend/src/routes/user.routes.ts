import { Router } from "express";
<<<<<<< HEAD
import { registerUserController, LoginUserController, getUserByEmailController } from "../controller/controller.usuario";
=======
import { registerUserController, LoginUserController, getUserByEmailController } from "../controller/user.controller";
>>>>>>> 57292a5e3af94c0779710718f230f8f3660c4e8a

const router = Router()
router.post("/register", registerUserController);

router.post("/login", LoginUserController);

router.get("/email", getUserByEmailController);

export default router;