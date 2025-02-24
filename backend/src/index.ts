import express from 'express';
import authRouter from './routes/auth';
import { port } from './config/env';

const app = express();
app.use(express.json());

app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

export default app;
