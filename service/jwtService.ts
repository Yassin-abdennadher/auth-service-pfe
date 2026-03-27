import jwt, { type JwtPayload } from 'jsonwebtoken';
import type { IUser } from '../model/User.js';
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;
const refreshSecret = process.env.JWT_REFRESH_SECRET;
const refreshExpires = process.env.JWT_REFRESH_EXPIRES_IN;


export const generateToken = (user: IUser) => {
    const payload = {
        email: user.email,
        username: user.username,
        role: user.role
    };

    if (!jwtSecret) throw new Error('JWT_SECRET manquant dans .env');
    if (!expiresIn) throw new Error('JWT_EXPIRES_IN manquant dans .env');
    // @ts-ignore
    return jwt.sign(payload, jwtSecret, { expiresIn });
}

export const generateRefreshToken = (user: IUser): string => {
    const payload = {
        email: user.email
    };

    if (!refreshSecret) throw new Error('JWT_REFRESH_SECRET manquant');

    // @ts-ignore    
    return jwt.sign(payload, refreshSecret, { expiresIn: refreshExpires });
};

export const verifyToken = (token: string): JwtPayload => {
    const decode = jwt.verify(token, jwtSecret as string);
    return decode as JwtPayload;
}


export const isValidToken = (token: string): boolean => {
    const decodedToken = jwt.verify(token, jwtSecret as string);
    return !!decodedToken;
}


export const refreshAccessToken = (refreshToken: string): string | null => {
    try {
        const decoded = jwt.verify(refreshToken, refreshSecret as string) as any;
        // @ts-ignore
        return jwt.sign(
            { email: decoded.email, username: decoded.username }, jwtSecret as string, { expiresIn : expiresIn as string }
        );
    } catch (error) {
        return null;
    }
};