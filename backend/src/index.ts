import express from 'express';
import authRouter from './routes/auth/auth';
import bookRouter from './routes/book/book';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import { app } from './app';
import { authMiddleware } from './middleware/auth-middleware';

const jsonOptions = express.json({ limit: '10kb' });

const corsOptions = cors({
  origin: 'http://localhost:3001',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  optionsSuccessStatus: 200,
});

const rateLimitOptions = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
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

app.use('/auth', authRouter);
app.use('/book', authMiddleware, bookRouter);

export default app;
