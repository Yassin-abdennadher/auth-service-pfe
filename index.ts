import type { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();
// import sequelize from './config/postgresqlConfig.js';
import sequelize from './config/postgresqlConfig.js';
import authController from './controller/authController.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// app.get('/a', (req, res) => {
//     res.json({ message: 'response from auth-service' });
// });

app.use('/users', authController);


try {
    await sequelize.authenticate();
    console.log('DB connected');

    await sequelize.sync({ alter: true });

    app.listen(process.env.PORT, () => {
        console.log(`http://localhost:${process.env.PORT}`);
    });

} catch (error) {
    console.error('DB connection failed:', error);
}
