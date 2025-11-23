import express, { Request, Response} from "express";
import {isAdmin} from "./middlewares";
import { connectDB } from "./config/config";
import usuarioRoutes from "./routes/routes.usuarios"



const PORT = 3000;
const hostname = "localhost";
const app = express();

//importar servicio de base de datos
connectDB();
//moddleware para que express entienda json en el body
app.use(express.json());

//--RUTAS(ENDPOINTS)--//

//ruta raiz
app.get("/", (req: Request, res: Response)=>{
    res.send("hello world with express");
})


//ruta protegida por el middleware 'isAdmin'

app.get("/admin", isAdmin, (req:Request, res: Response)=>{
    res.send("hola admin");

});

//ruta para usuarios
app.use("/api/usuarios",usuarioRoutes)


//// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});




