import express from 'express';
import { port } from './config/env';
import { logger } from './utils/logger';

export const app = express();

const server = app.listen(port, () => {
  logger.info(`Servidor rodando na porta ${port}`);
});

export default server;
