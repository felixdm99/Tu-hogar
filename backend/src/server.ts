import express from "express";
import { connectDB } from "./config/config";
import userRoutes from "./routes/user.routes"
import productRoutes from "./routes/product.routes"
import categoryRoutes from "./routes/category.routes";
import orderRoutes from "./routes/order.routes";
import cartRoutes from "./routes/cart.routes";
import reviewRoutes from "./routes/review.routes"



const PORT = 3000;
const hostname = "localhost";
const app = express();


connectDB();

app.use(express.json());


app.use("/api/users", userRoutes)
app.use ("/api/products", productRoutes)
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes )
app.use("/api/cart", cartRoutes)
app.use("/api/reviews", reviewRoutes)

app.listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});




