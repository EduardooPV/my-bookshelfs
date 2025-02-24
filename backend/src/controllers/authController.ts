import { Request, Response } from 'express';
import {
  signUp,
  signIn,
  signOut,
  forgotPassword,
  resetPassword,
} from '../services/authService';

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

export const signOutController = async (req: Request, res: Response) => {
  try {
    const out = await signOut();

    res.status(200).json({ out });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const forgotPasswordController = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const response = await forgotPassword(email);

    res.status(200).json({ response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const resetPasswordController = async (req: Request, res: Response) => {
  const { password } = req.body;

  try {
    const response = await resetPassword(password);

    res.status(200).json({ response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
