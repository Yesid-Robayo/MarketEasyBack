import { userModel } from "../models/user.model";

export const userController = {
    async register(req: any, res: any) {
        const { name, email, phone, address, password } = req.body;
        if (!name || !email || !phone || !address || !password) {
            res.status(400).json({ code: 400, message: "Todos los campos son requeridos." });
            return;
        }
        const result = await userModel.register(name, email, phone, address, password);
        if (result) {
            res.status(200).json({ code: 200, message: 'Usuario registrado exitosamente.' });
        } else {
            res.status(500).json({ code: 500, message: 'Error interno del servidor.' });
        }
    },
    async updateUser(req: any, res: any) {
        const { id, name, email, phone, address } = req.body;
        if (!id || !name || !email || !phone || !address) {
            res.status(400).json({ code: 400, message: 'Todos los campos son requeridos.' });
            return;
        }
        const result = await userModel.updateUser(id, name, email, phone, address);
        if (result) {
            res.status(200).json({ code: 200, message: 'Usuario actualizado exitosamente.' });
        } else {
            res.status(500).json({ code: 500, message: 'Error interno del servidor.' });
        }
    },
    async deleteUser(req: any, res: any) {
        const { id } = req.body;
        if (!id) {
            res.status(400).json({ code: 400, message: 'Id es requerida' });
            return;
        }
        const result = await userModel.deleteUser(id);
        if (result) {
            res.status(200).json({ code: 200, message: 'Usuario eliminado exitosamente.' });
        } else {
            res.status(500).json({ code: 500, message: 'Error interno del servidor.' });
        }
    },
    async getUserByEmail(req: any, res: any) {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ code: 400, message: 'Email es requerido.' });
            return;
        }
        const result = await userModel.getUserByEmail(email);
        if (result) {
            res.status(200).json({ code: 200, user: result });
        } else {
            res.status(404).json({ code: 404, message: 'Usuario no encontrado.' });
        }
    }

}