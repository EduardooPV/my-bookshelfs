import { Request, Response } from 'express';
import { signUp, signIn } from '../services/authService';

export const signUpController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await signUp(email, password);

    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const signInController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const session = await signIn(email, password);

    res.status(200).json({ session });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
