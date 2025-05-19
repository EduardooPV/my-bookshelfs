/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import { router as authRouter } from './routes/auth';
import { router as bookRouter } from './routes/book';
import { router as meRouter } from './routes/me';
import { app } from './app';
import { authMiddleware } from './middleware/auth-middleware';
import { requestLogger } from './middleware/request-logger-middleware';
import cookieParser from 'cookie-parser';

const jsonOptions = express.json({ limit: '10kb' });

const corsOptions = cors({
  origin: (origin: string | undefined, callback: Function) => {
    if (
      !origin ||
      origin.startsWith('https://my-bookshelfs-frontend') ||
      origin === 'http://localhost:3000'
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  optionsSuccessStatus: 200,
  credentials: true,
});

const rateLimitOptions = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message:
    'Muitas requisições vindas deste IP, por favor, tente novamente mais tarde.',
});

const helmetOptions = helmet({
  contentSecurityPolicy: false,
});

app.use(jsonOptions);
app.use(corsOptions);
app.use(rateLimitOptions);
app.use(helmetOptions);
app.use(hpp());
app.use(requestLogger);
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/book', authMiddleware, bookRouter);
app.use('/me', authMiddleware, meRouter);

export default app;
