import express from 'express';
import authRouter from './routes/auth';
import booksRouter from './routes/books';
import wishlistRouter from './routes/wishlist';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import { app } from './app';
import { authMiddleware } from './middleware/auth-middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import path from 'path';

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

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Bookshelfs API',
      version: '1.0.0',
      description: 'API para gerenciamento de livros e lista de desejos',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor local (desenvolvimento)',
      },
      {
        url: 'https://my-bookshelfs-backend.vercel.app',
        description: 'Servidor de produção (Vercel)',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './dist/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(jsonOptions);
app.use(corsOptions);
app.use(rateLimitOptions);
app.use(helmetOptions);
app.use(hpp());

app.use('/auth', authRouter);
app.use('/books', authMiddleware, booksRouter);
app.use('/wishlist', authMiddleware, wishlistRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

if (process.env.NODE_ENV === 'production') {
  app.use(
    '/api-docs',
    express.static(path.join(__dirname, '../node_modules/swagger-ui-dist')),
  );
}

app.get('/swagger.json', (req, res) => {
  res.json(swaggerDocs);
});
export default app;
