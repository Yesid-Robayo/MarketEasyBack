import { verifyPassword } from "../../config/bcrypt.config";
import { query } from "../../config/database.config";

export const authModel = {

    async login(email: string, password: string) {

        try {

            const sql = 'SELECT * FROM users WHERE email = ?';
            const [rows] = await query(sql, [email]);

            if (rows == undefined || rows.length === 0) {
                return false;
            }

            const sql2 = 'SELECT * FROM passwords WHERE user_id = ?';
            const [rows2] = await query(sql2, [rows.id]);

            if (rows2.length === 0) {
                return false;
            }
            const storedHash = rows2.password_hash;
       
            const match = await verifyPassword(password, storedHash);

            if (match) {
                return rows;
            } else {
                return false;
            }


        } catch (error) {
            console.error('Error in authModel.login:', error);
            throw error;
        }
    }

}