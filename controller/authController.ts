import type { Request, Response } from 'express';
import * as authService from '../service/authService.js';
import express from 'express';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const user = await authService.createUser(req.body);

        res.status(201).json({
            success: true,
            data: user,
            message: "user créé avec succès"
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await authService.getAllUsers();

        res.json({
            success: true,
            count: users.length,
            data: users
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await authService.getUserById(req.params.id as string);

        res.json({
            success: true,
            data: user
        });

    } catch (error: any) {
        res.status(404).json({
            success: false,
            error: error.message
        });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const user = await authService.updateUser(req.params.id as string, req.body);

        res.json({
            success: true,
            data: user,
            message: "user mis à jour"
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const result = await authService.deleteUser(req.params.id as string);

        res.json({
            success: true,
            data: result
        });

    } catch (error: any) {
        res.status(404).json({
            success: false,
            error: error.message
        });
    }
});

export default router;