import { Request, Response } from 'express';
import {
  getAllBooksService,
  getBookService,
  deleteBookService,
  readingBookService,
  doneBookService,
  wishlistBookService,
} from '../../services/book';
import { AuthenticatedRequest } from '../../middleware/auth-middleware';

export const getAllBooksController = async (req: Request, res: Response) => {
  try {
    const { search = '', page = 1, limit = 10 } = req.query;

    const books = await getAllBooksService(
      String(search),
      Number(page),
      Number(limit),
    );

    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getBookControler = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const book = await getBookService(bookId);

    res.status(200).json({ book });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteBookController = () => {
  deleteBookService();
};

export const readingBookController = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const { bookId } = req.params;
    const userId = req.userId;

    if (userId) {
      const book = await readingBookService(bookId, userId);

      res.status(201).json({ book });
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
export const doneBookController = () => {
  doneBookService();
};
export const wishlistBookController = () => {
  wishlistBookService();
};
