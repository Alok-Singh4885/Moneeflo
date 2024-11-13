import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import userRoutes from './src/routes/invoiceGeneratorRoutes';
import { mongoose } from "./config/db-connection"; 

import connectDB from './config/db'; 

dotenv.config();

connectDB();

const app: Application = express();
const PORT = process.env.PORT || 4001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/invoices', express.static(path.join(__dirname, '../../invoices')));
app.use('/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the API!');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Internal server error', error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
