import { User, UserCredentials } from "../interfaces/user.interface";
import { pool } from "../db/connection";
import { hashPassword } from "../utils/security";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/security";
import { createUserSession } from "../session.server";
import { Response } from "express";


export async function register(user: Omit<User, 'id' | 'role'>): Promise <User> {
    const { username, password } = user;

    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]   
    );

    if (existingUser.rows.length > 0) {
        throw new Error('El nombre de usuario ya está en uso');
    }

    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
        'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role',
        [username, hashedPassword, 'employee']
    );

    return result.rows[0];
}

export async function login({ username, password }: UserCredentials, res: Response) {
    const result = await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]  
    );

    const user = result.rows[0];

    if (!user) {
        throw new Error('Usuario o contraseña incorrectos');
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if(!comparePassword) {
        throw new Error('Contraseña incorrecta');
    }

    const token = generateToken(user);
    
    createUserSession(res, token);

    const { password: _, ...userData } = user;
    
    return {
        user: userData
    };
}


export async function logout(_: any, res: Response) {
    res.cookie('auth_token', '', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0),
    });
      
    res.status(200).json({ message: 'Sesión cerrada correctamente' });
}