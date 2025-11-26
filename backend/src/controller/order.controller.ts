import { Request, Response } from "express";
import { OrderService } from "../services/order.service";
import { OrderModel } from "../models/order.model";


export class OrderController{
    static async createOrder(req: Request, res: Response){
        try{
            const data = req.body
            const order = await OrderService.createOrder(data);

            return res.status(201).json({
                ok: true,
                message: "Orden creada extirosamente",
                order,
            });
        }catch (error: any){
            console.error("Error al crear la orden", error);

            return res.status(400).json({
                ok: false,
                message: error.message || "Error al crear orden",
            });
        }
    }
}

export const getOrdersController = async (req: Request, res: Response) => {
    try {
        const orders = await OrderModel.find()
            .populate("customer", "name email") 
            .populate("items.product", "name price"); 

        res.status(200).json({
            message: "Órdenes obtenidas correctamente",
            total: orders.length,
            orders
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const cancelOrderController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const order = await OrderModel.findById(id);
        if (!order) return res.status(404).json({ message: "Orden no encontrada" });

        if (order.status === "enviado" || order.status === "completado") {
            return res.status(400).json({ message: "No se puede cancelar una orden ya procesada o completada" });
        }

        if (order.status === "cancelada") {
            return res.status(400).json({ message: "La orden ya estaba cancelada" });
        }

        order.status = "cancelada";
        await order.save();

        res.status(200).json({
            message: "Orden cancelada correctamente",
            order
        });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const updateOrderStatusController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = [
            "pendiente", 
            "pagado", 
            "procesando", 
            "enviado", 
            "completado", 
            "cancelada"
        ];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Estado inválido" });
        }

        const order = await OrderModel.findById(id);
        if (!order) return res.status(404).json({ message: "Orden no encontrada" });

        order.status = status;
        await order.save();

        res.status(200).json({
            message: "Estado actualizado correctamente",
            order
        });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const orderController = new OrderController();