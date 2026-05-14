import express from "express";
import jwt from 'jsonwebtoken';
import * as jwtService from '../service/jwtService.js';
import { getUserById } from "../service/authService.js";
const router = express.Router();
router.post('/', async (req, res) => {
    const { refreshToken } = req.body;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    try {
        const decoded = jwt.verify(refreshToken, refreshSecret);
        console.log('decoded from refresh : ', decoded);
        const user = await getUserById(decoded.id);
        console.log('user from refresh : ', user);
        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }
        const newAccessToken = jwtService.generateToken(user);
        res.json({ accessToken: newAccessToken });
    }
    catch {
        res.status(401).json({ message: 'Refresh token invalide' });
    }
});
export default router;
//# sourceMappingURL=refreshController.js.map