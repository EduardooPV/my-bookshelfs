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

const corsConfig = {
  origin: [
    'https://my-bookshelfs-frontend.vercel.app',
    'http://localhost:3000',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const rateLimitOptions = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  limit: 100,
  message:
    'Muitas requisições vindas deste IP, por favor, tente novamente mais tarde.',
});

const helmetOptions = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'", 'https://my-bookshelfs-frontend.vercel.app'],
      scriptSrc: ["'self'", 'https://my-bookshelfs-frontend.vercel.app'],
      styleSrc: [
        "'self'",
        'https://my-bookshelfs-frontend.vercel.app',
        "'unsafe-inline'",
      ],
      imgSrc: ["'self'", 'data:', 'https://my-bookshelfs-frontend.vercel.app'],
      connectSrc: ["'self'", 'https://my-bookshelfs-frontend.vercel.app'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  referrerPolicy: { policy: 'no-referrer' },
  frameguard: { action: 'deny' },
  xssFilter: true,
  noSniff: true,
  hidePoweredBy: true,
});

app.set('trust proxy', 1);
app.use(cors(corsConfig));
app.use(jsonOptions);
app.use(cookieParser());
app.use(rateLimitOptions);
app.use(helmetOptions);
app.use(hpp());
app.use(requestLogger);

app.use('/auth', authRouter);
app.use('/book', authMiddleware, bookRouter);
app.use('/me', authMiddleware, meRouter);

export default app;
