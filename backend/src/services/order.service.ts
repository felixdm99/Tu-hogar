import { OrderModel } from "../models/order.model";
import { ProductModel } from "../models/product.model";
import UserModel from "../models/user.model";

export class OrderService {

    static async createOrder(data: any) {

        
        const user = await UserModel.findById(data.customer);
        if (!user) throw new Error("El usuario no existe");

        let subtotal = 0;
        const itemsProcessed: any[] = [];

        
        for (const item of data.items) {
            const productDB = await ProductModel.findById(item.product);
            if (!productDB) throw new Error("Producto no encontrado");

            if (productDB.inventory.quantity < item.quantity) {
                throw new Error(`Stock insuficiente para ${productDB.name}`);
            }

            const itemSubtotal = productDB.price.regular * item.quantity;

            itemsProcessed.push({
                product: productDB._id,
                name: productDB.name,
                price: productDB.price,
                quantity: item.quantity,
                subtotal: itemSubtotal,
                attributes: item.attributes || {},
            });

            subtotal += itemSubtotal;

            
            productDB.inventory.quantity -= item.quantity;
            await productDB.save();
        }

        const total = subtotal + data.payment.cost;

        const orderNumber = "ORD-" + Date.now();

        const order = new OrderModel({
            orderNumber,
            customer: data.customer,
            items: itemsProcessed,
            totals: {
                subtotal,
                shipping: data.payment.cost,
                total,
            },
            shippingAddress: data.shippingAddress,
            billingAddress: data.billingAddress,
            payment: {
                method: data.payment.method,
                cost: data.payment.cost,
                status: "pendiente",
            },
            status: "pendiente",
        });

        await order.save();
        return order;
    }
    static async getOrders() {
        return await OrderModel.find()
            .populate("customer", "name email")
            .populate("items.product", "name price");
    }
}