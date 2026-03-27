import { type JwtPayload } from 'jsonwebtoken';
import type { IUser } from '../model/User.js';
export declare const generateToken: (user: IUser) => never;
export declare const generateRefreshToken: (user: IUser) => string;
export declare const verifyToken: (token: string) => JwtPayload;
export declare const isValidToken: (token: string) => boolean;
export declare const refreshAccessToken: (refreshToken: string) => string | null;
//# sourceMappingURL=jwtService.d.ts.map