import { query } from "../../config/database.config";
function imageBase64toBlob(imageBase64: string) {
    const base64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64, 'base64');
    return buffer;
}

export const productModel = {
    async createProduct(name: string, description: string, price: string, stock: string, imageBase64: string,) {
        try {
            const imageBlob = imageBase64toBlob(imageBase64);

            const sql = 'INSERT INTO products (name, description, price, stock, image) VALUES (?, ?, ?, ?, ?)';
            const params = [name, description, price, stock, imageBlob];
            const result = await query(sql, params);
            return result;

        } catch (error) {
            console.error('Error in productModel.createProduct:', error);
            throw error;
        }
    },
    async getProducts() {
        const sql = 'SELECT * FROM products';
        const [rows] = await query(sql, []);
        return rows;
    },
    async getProductById(id: number) {
        const sql = 'SELECT * FROM products WHERE id = ?';
        const [rows] = await query(sql, [id]);
        return rows;
    },

    async updateProduct(id: number, name: string, description: string, price: string, stock: string, imageBase64: string, status: "avalible" | "unavalible") {
        try {
            const imageBlob = imageBase64toBlob(imageBase64);

            const sql = 'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, image = ?, status = ? WHERE id = ?';
            const params = [name, description, price, stock, imageBlob, status, id];
            const result = await query(sql, params);
            return result;

        } catch (error) {
            console.error('Error in productModel.updateProduct:', error);
            throw error;
        }

    },
    async deleteProduct(id: number) {
        const sql = 'DELETE FROM products WHERE id = ?';
        const [result] = await query(sql, [id]);
        return result;
    }
}