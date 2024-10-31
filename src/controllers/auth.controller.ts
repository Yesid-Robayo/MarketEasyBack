import { authModel } from "../models/auth.model";

export const authController = {
    async login(req: any, res: any) {
        try {
            const { email, password } = req.body;
            const result = await authModel.login(email, password);
            if (result) {
                res.status(200).json({ code: 200, user: result });
            } else {
                res.status(401).json({ code: 401, message: 'Credenciales Invalidas,Por favor intentalo nuevamente' });
            }
        } catch (error) {
            res.status(500).json({ code: 500, message: 'Error interno del servidor' });
        }
    }
}