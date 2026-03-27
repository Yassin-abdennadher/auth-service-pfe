import type { Request, Response } from 'express';
import express from 'express';
import * as authService from '../service/authService.js';
import * as jwtService from '../service/jwtService.js';
import { decode } from 'node:punycode';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        console.log("token : ",token)
        if (!token) {
            return res.status(401).json({
                valid: false,
                message: 'Token manquant'
            });
        }

        const decoded = jwtService.verifyToken(token);
        console.log('decoded : ',decoded);

        res.json({
            valid: true,
            user : decoded
        });

    } catch (error : any) {
        res.status(401).json({
            valid: false,
            message: 'Token invalide'
        });
    }
});

export default router