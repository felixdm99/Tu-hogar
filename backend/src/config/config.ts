import mongoose from "mongoose";



const MONGO_URI =
	"mongodb+srv://admin:thekitokun@cluster0.oaexbd6.mongodb.net/?appName=Cluster0";

export const connectDB = async () => {
	try {

		await mongoose.connect(MONGO_URI);
		console.log("✅ MongoDB Conectado Exitosamente");
	} catch (error) {
		console.error("❌ Error al conectar a MongoDB:", error);

		process.exit(1);
	}
};