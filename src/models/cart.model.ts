import { createPool, query } from "../../config/database.config";

export const cartModel = {
    async addProductToCart(userId: number, productId: number, quantity: number) {
        const connection = await createPool().getConnection();
        try {
            await connection.beginTransaction();

            const [result] = await connection.execute(
                'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
                [userId, productId, quantity]
            );
            const sqlChangeStock = 'UPDATE products SET stock = stock - ? WHERE id = ?';
            await connection.execute(sqlChangeStock, [quantity, productId]);

            await connection.commit();
            return result;
        } catch (error) {
            await connection.rollback();
            console.error('Error in cartModel.addProductToCart:', error);
            throw error;
        } finally {
            connection.release();
        }

    },

    async getCart(userId: number) {
        try {
            const sql = 'SELECT * FROM cart WHERE user_id = ?';
            const [rows] = await query(sql, [userId]);
            return rows;
        } catch (error) {
            console.error('Error in cartModel.getCart:', error);
            throw error;
        }
    },
    async deleteProductFromCart(userId: number, productId: number) {
        const connection = await createPool().getConnection();
        try {
            await connection.beginTransaction();
            const sqlChangeStock = 'UPDATE products SET stock = stock + (SELECT quantity FROM cart WHERE user_id = ? AND product_id = ?) WHERE id = ?';
            await connection.execute(sqlChangeStock, [userId, productId, productId]);
            const [result] = await connection.execute(
                'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
                [userId, productId]
            );


            await connection.commit();
            return result;
        } catch (error) {
            await connection.rollback();
            console.error('Error in cartModel.deleteProductFromCart:', error);
            throw error;
        } finally {
            connection.release();
        }
    }
}