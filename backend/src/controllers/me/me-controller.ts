import { Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth-middleware';
import {
  getBookStatusService,
  getCountBookStatusService,
} from '../../services/me';

const getBooksStatusController = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.userId;
    const { status } = req.query;

    if (userId) {
      const books = await getBookStatusService(userId, status as string);

      res.status(200).json(books);
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

const getCountBooksStatusController = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.userId;
    const { status } = req.query;

    if (userId) {
      const books = await getCountBookStatusService(userId, status as string);

      res.status(200).json(books);
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export { getBooksStatusController, getCountBooksStatusController };
