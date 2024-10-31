
import { hashPassword } from "../../config/bcrypt.config";
import { createPool, query } from "../../config/database.config";

export const userModel = {
    async register(name: string, email: string, phone: string, address: string, password: string) {

        const connection = await createPool().getConnection();

        try {
            await connection.beginTransaction();

            const [result] = await connection.execute(
                'INSERT INTO users (name,email, phone, address) VALUES (?, ?, ?, ?)',
                [name, email, phone, address]
            );

            const userId = result.insertId;

            const hashedPassword = await hashPassword(password);
            await connection.execute(
                'INSERT INTO passwords (user_id, password_hash,is_temporary) VALUES (?, ?,?)',
                [userId, hashedPassword, 0]);
            await connection.commit();
            return true;
        } catch (error) {
            await connection.rollback();
            console.error('Error in userModel.register:', error);
            throw error;
        } finally {
            connection.release();
        }

    },
    async getUserByEmail(email: string) {
        try {
            const sql = 'SELECT * FROM users WHERE email = ?';
            const [rows] = await query(sql, [email]);
            return rows;
        } catch (error) {
            console.error('Error in userModel.getUserByEmail:', error);
            throw error;
        }
    },
    async updateUser(id: number, name: string, email: string, phone: string, address: string) {
        try {
            const sql = 'UPDATE users SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?';
            const [result] = await query(sql, [name, email, phone, address, id]);
            return result;
        } catch (error) {
            console.error('Error in userModel.updateUser:', error);
            throw error;

        }
    },
    async deleteUser(id: number) {

        const connection = await createPool().getConnection();
        try {
            await connection.beginTransaction();
            await connection.execute('DELETE FROM passwords WHERE user_id = ?', [id]);
            await connection.execute('DELETE FROM users WHERE id = ?', [id]);
            await connection.commit();
            return true;
        } catch (error) {
            await connection.rollback();
            console.error('Error in userModel.deleteUser:', error);
            throw error;
        }
    }}