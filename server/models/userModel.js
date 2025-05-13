import pool from '../db.js';

export const findUserByEmail = async (Email) => {
    const result = await pool.query('SELECT * FROM users WHERE EMAIL = $1', [Email]);
    return result.rows[0];
}

export const createUser = async (username, email, hashedPassword) => {
    await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);
}