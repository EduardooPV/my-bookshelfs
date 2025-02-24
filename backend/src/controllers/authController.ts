import { Request, Response } from 'express';
import { signUp } from '../services/authService';

export const signUpController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await signUp(email, password);

    res.status(201).json({ user });
  } catch {
    res.status(400).json({ error: 'Erro interno no servidor' });
  }
};
