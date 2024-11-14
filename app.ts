import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import userRoutes from './src/routes/invoiceGeneratorRoutes';
import mongoose from 'mongoose';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4001;

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Monefflo';
    console.log('Attempting to connect to MongoDB at:', mongoURI);
    
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const startServer = async () => {
  try {
    await connectDB();
    
    app.use(morgan('dev'));
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
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;