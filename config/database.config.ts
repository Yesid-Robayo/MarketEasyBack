import mysql from 'mysql2/promise';
import config from './config';

let pool: any;

export const createPool = () => {
    if (!pool) {
        pool = mysql.createPool({

            host: config.database.host,
            port: config.database.port,
            user: config.database.username,
            password: config.database.password,
            database: config.database.name,
            waitForConnections: true,
            connectionLimit: 15,
            queueLimit: 0,

        } as any);
        console.log('Pool created.');
    }
    return pool;
};

export const query = async (sql: any, params: any) => {
    const connection = await createPool().getConnection();
    try {
        const [results] = await connection.execute(sql, params);
        return results;
    } catch (error) {
        console.error('Error :', error);
        throw error;
    } finally {
        connection.release();
    }
};


export const multiQueryTransaction = async (queries: Array<{ sql: string; params: any[] }>) => {
    const connection = await createPool().getConnection();

    try {
        await connection.beginTransaction();

        const results: any = [];
        for (const queryInfo of queries) {
            const [result] = await connection.execute(queryInfo.sql, queryInfo.params);
            results.push(result);
        }

        await connection.commit();
        return results;
    } catch (error) {
        await connection.rollback();
        console.error('Error in multiQueryTransaction:', error);
        throw error;
    } finally {
        connection.release();
    }
};


export const closePool = async () => {
    if (pool) {
        await pool.end();
        pool = null;
        console.log('Pool closed.');
    }
};



