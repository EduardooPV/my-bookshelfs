import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/database';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const headerTokem = req.headers.authorization
      ?.replace('Bearer ', '')
      .trim();
    const cookieToken = req.cookies?.access_token;

    const token = headerTokem || cookieToken;

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

export { authMiddleware, AuthenticatedRequest };
