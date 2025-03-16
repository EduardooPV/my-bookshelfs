import express from 'express';
import { port } from './config/env';

export const app = express();

const server = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Documentação disponível em /docs-api`);
});

export default server;
