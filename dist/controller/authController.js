import express from 'express';
import * as authService from '../service/authService.js';
import * as jwtService from '../service/jwtService.js';
const router = express.Router();
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.login(email, password);
        const accessToken = jwtService.generateToken(user);
        const refreshToken = jwtService.generateRefreshToken(user);
        res.status(200).json({
            success: true,
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: {
                id: user.id,
                userFullname: user.userFullname,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }
});
router.post('/', async (req, res) => {
    try {
        const user = await authService.createUser(req.body);
        res.status(201).json({
            success: true,
            data: user,
            message: "Utilisateur créé avec succès"
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});
router.get('/', async (req, res) => {
    try {
        const users = await authService.getAllUsers();
        res.json({
            success: true,
            count: users.length,
            data: users
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const user = await authService.getUserById(req.params.id);
        res.json({
            success: true,
            data: user
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const user = await authService.updateUser(req.params.id, req.body);
        res.json({
            success: true,
            data: user,
            message: "Utilisateur mis à jour"
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const result = await authService.deleteUser(req.params.id);
        res.json({
            success: true,
            data: result
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        });
    }
});
export default router;
//# sourceMappingURL=authController.js.map