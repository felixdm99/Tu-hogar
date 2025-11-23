import express, { Request, Response} from "express";
import { connectDB } from "./config/config";
import userRoutes from "./routes/user.routes"



const PORT = 3000;
const hostname = "localhost";
const app = express();


connectDB();

app.use(express.json());


app.use("/api/users", userRoutes)

app.listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});




