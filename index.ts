import type { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();
import sequelize from './config/postgresqlConfig.js';
import authController from './controller/authController.js';
import verifyTokenController from './controller/verifyTokenController.js';
import refreshController from './controller/refreshController.js';

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());
app.use(helmet());

app.use('/users', authController);
app.use('/verify', verifyTokenController);
app.use('/refresh',refreshController);

try {
    await sequelize.authenticate();
    console.log('DB connected');

    await sequelize.sync({ alter: true });

    const server = app.listen(process.env.PORT, () => {
        console.log(`🚀 Auth service sur port 1 : ${process.env.PORT}`);
    });

    server.keepAliveTimeout = 65000;
    server.headersTimeout = 70000;

} catch (error) {
    console.error('DB connection failed:', error);
}
