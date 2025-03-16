import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseKey } from '../config/env';

const supabase = createClient(supabaseUrl, supabaseKey);

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '').trim();

    if (!token) {
      res.status(401).json({
        error: 'Token não fornecido',
      });
      return;
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      res.status(401).json({
        error: 'Usuário não autenticado',
      });
      return;
    }

    req.userId = user.id;
    next();
  } catch (error: unknown) {
    res.status(401).json({
      error: 'Erro na autenticação',
      message: error,
    });
  }
};
