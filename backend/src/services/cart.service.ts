import { CartModel } from "../models/cart.model";
import { ProductModel } from "../models/product.model";
import { Types } from "mongoose";

interface AddItemData {
    user?: string;       
    sessionId?: string;  
    product: string;
    quantity: number;
    attributes?: {
        color?: string;
        size?: string;
    };
}

export class CartService {

    
    static async addItem(data: AddItemData) {
        const product = await ProductModel.findById(data.product);
        if (!product) throw new Error("Producto no encontrado");

        
        let cart;
        if (data.user) {
            cart = await CartModel.findOne({ user: data.user });
        } else if (data.sessionId) {
            cart = await CartModel.findOne({ sessionId: data.sessionId });
        }

        
        if (!cart) {
            cart = new CartModel({
                user: data.user,
                sessionId: data.sessionId,
                items: [],
            });
        }

        
        const existingItemIndex = cart.items.findIndex(item => 
            item.product.toString() === data.product &&
            JSON.stringify(item.attributes) === JSON.stringify(data.attributes || {})
        );

        if (existingItemIndex > -1) {
            
            cart.items[existingItemIndex].quantity += data.quantity;
        } else {
            cart.items.push({
                product: new Types.ObjectId(data.product),
                quantity: data.quantity,
                price: product.price.regular,
                addedAt: new Date(),
                attributes: data.attributes || {},
            });
        }

        await cart.save();
        return cart;
    }

    static async getCart(user?: string, sessionId?: string) {
        const cart = await CartModel.findOne(
            user ? { user } : { sessionId }
        ).populate("items.product", "name price");

        return cart || null;
    }


    static async clearCart(user?: string, sessionId?: string) {
        const cart = await CartModel.findOneAndDelete(
            user ? { user } : { sessionId }
        );
        return cart;
    }
}
