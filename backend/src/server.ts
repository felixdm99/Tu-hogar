import express from "express";
import { connectDB } from "./config/config";
import userRoutes from "./routes/user.routes"
import productRoutes from "./routes/product.routes"



const PORT = 3000;
const hostname = "localhost";
const app = express();


connectDB();

app.use(express.json());


app.use("/api/users", userRoutes)
app.use ("/api/products", productRoutes)

app.listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});




