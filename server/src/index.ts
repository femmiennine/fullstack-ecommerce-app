import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/users.route';
import adminRouter from './routes/admin.route';
import productRouter from './routes/products.route';
import dev from './config/secrets';
import connectDB from './config/db';
import { Request, Response, NextFunction } from 'express';
import { clientError, serverError } from './middleware/errorHandler';

const app = express();
app.use(cors({ origin: dev.app.client_url, credentials: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/products', productRouter);

const port = dev.app.port || 4008;
app.listen(port, async () => {
  console.log(`Server is running at port http://localhost:${port}`);
  await connectDB();
});

app.get('/testRoute', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send('Welcome to the Server!');
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.use(clientError);
app.use(serverError);
