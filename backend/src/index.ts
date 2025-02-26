import express from 'express';
import authRouter from './routes/auth';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';

const app = express();

const jsonOptions = express.json({ limit: '10kb' });

const corsOptions = cors({
  origin: 'https://frontend.com',
  optionsSuccessStatus: 200,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    'Muitas requisições vindas deste IP, por favor, tente novamente mais tarde.',
});

app.use(jsonOptions);
app.use(corsOptions);
app.use(limiter);
app.use(helmet());
app.use(hpp());

app.use('/auth', authRouter);

export default app;
