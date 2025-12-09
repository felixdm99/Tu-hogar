import { Router } from "express";
import { registerUserController, LoginUserController, getUserByEmailController } from "../controller/user.controller";
import { verifyToken } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router()

router.post("/register", registerUserController);
router.post("/login", LoginUserController);
router.get("/email", getUserByEmailController);

//Rutas protegidas:
router.get("/private", verifyToken, (req, res) => {
  res.json({ msg: "Accediste a una ruta protegida", user: req.user });
});
router.get("/admin-panel", verifyToken, isAdmin, (req, res) => {
  res.json({ msg: "Bienvenido al panel de administrador" });
});

export default router;