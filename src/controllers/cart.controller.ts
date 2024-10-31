import { cartModel } from "../models/cart.model";

export const cartController = {
    async addProductToCart(req: any, res: any) {
        try {
            const { userId, productId, quantity } = req.body;
            if (!userId || !productId || !quantity) {
                res.status(400).json({ code: 400, message: 'Todos los datos requeridos' });
                return;
            }
            const result = await cartModel.addProductToCart(userId, productId, quantity);
            res.status(200).json({ code: 200, message: 'Producto agregado al carrito exitosamente' });
        } catch (error) {
            console.error('Error in cartController.addProductToCart:', error);
            res.status(500).json({ code: 500, message: 'Error interno del servidor' });
        }
    },
    async getCart(req: any, res: any) {
        try {
            const userId = req.query.userId;
            const result = await cartModel.getCart(userId);
            if (!result) {
                res.status(404).json({ code: 404, message: 'No se encontraron productos en el carrito' });
                return;
            }
            res.status(200).json({ code: 200, data: result });

        } catch (error) {
            console.error('Error in cartController.getCart:', error);
            res.status(500).json({ code: 500, message: 'Error interno del servidor' });
        }
    },
    async deleteProductFromCart(req: any, res: any) {
        try {
            const { userId, productId } = req.body;
            if (!userId || !productId) {
                res.status(400).json({ code: 400, message: 'Todos los datos requeridos' });
                return;
            }
            const result = await cartModel.deleteProductFromCart(userId, productId);
            res.status(200).json({ code: 200, message: 'Producto eliminado del carrito exitosamente' });
        } catch (error) {
            console.error('Error in cartController.deleteProductFromCart:', error);
            res.status(500).json({ code: 500, message: 'Error interno del servidor' });
        }
    }
}