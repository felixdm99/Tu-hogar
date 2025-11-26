import { Request, Response } from "express";
import { CartService } from "../services/cart.service";


export const addItemController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const cart = await CartService.addItem(data);
        return res.json({ message: "Producto agregado al carrito", cart });
    } catch (error: any) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};


export const getCartController = async (req: Request, res: Response) => {
    try {
        const { user, sessionId } = req.query;
        const cart = await CartService.getCart(user as string, sessionId as string);
        return res.json(cart);
    } catch (error: any) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};

export const clearCartController = async (req: Request, res: Response) => {
    try {
        const { user, sessionId } = req.body;
        const cart = await CartService.clearCart(user, sessionId);
        return res.json({ message: "Carrito vaciado", cart });
    } catch (error: any) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};
