import jwt, {} from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;
const refreshSecret = process.env.JWT_REFRESH_SECRET;
const refreshExpires = process.env.JWT_REFRESH_EXPIRES_IN;
export const generateToken = (user) => {
    const payload = {
        email: user.email,
        username: user.username,
        role: user.role
    };
    if (!jwtSecret)
        throw new Error('JWT_SECRET manquant dans .env');
    if (!expiresIn)
        throw new Error('JWT_EXPIRES_IN manquant dans .env');
    // @ts-ignore
    return jwt.sign(payload, jwtSecret, { expiresIn });
};
export const generateRefreshToken = (user) => {
    const payload = {
        email: user.email
    };
    if (!refreshSecret)
        throw new Error('JWT_REFRESH_SECRET manquant');
    // @ts-ignore    
    return jwt.sign(payload, refreshSecret, { expiresIn: refreshExpires });
};
export const verifyToken = (token) => {
    const decode = jwt.verify(token, jwtSecret);
    return decode;
};
export const isValidToken = (token) => {
    const decodedToken = jwt.verify(token, jwtSecret);
    return !!decodedToken;
};
export const refreshAccessToken = (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, refreshSecret);
        // @ts-ignore
        return jwt.sign({ email: decoded.email, username: decoded.username }, jwtSecret, { expiresIn: expiresIn });
    }
    catch (error) {
        return null;
    }
};
//# sourceMappingURL=jwtService.js.map