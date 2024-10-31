import { productModel } from "../models/products.model";
export const productsController = {
    async createProduct(req: any, res: any) {
        const { name, description, price, stock, imageBase64 } = req.body;
        if (!name || !description || !price || !stock || !imageBase64) {
            res.status(400).json({ code: 400, message: "Todos los datos requeridos" });
            return;
        }
        const result = await productModel.createProduct(name, description, price, stock, imageBase64);
        if (result) {
            res.status(200).json({ code: 200, message: "Producto creado exitosamente" });
        } else {
            res.status(500).json({ code: 500, message: "Error interno del servidor" });
        }
    },
    async getProducts(req: any, res: any) {
        const result = await productModel.getProducts();
        res.status(200).json(result);
    }

}