import { Request, Response } from 'express';
import {
  getAllBooksService,
  getBookService,
  deleteBookService,
  changeStatusBookService,
} from '../../services/book';
import { AuthenticatedRequest } from '../../middleware/auth-middleware';

const getBookControler = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const book = await getBookService(bookId);

    res.status(200).json({ book });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

const getAllBooksController = async (req: Request, res: Response) => {
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

const changeStatusBookController = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const { bookId } = req.params;
    const userId = req.userId;
    const { status } = req.body;

    if (userId) {
      const book = await changeStatusBookService(bookId, userId, status);

      res.status(201).json(book);
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

const deleteBookController = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const { bookId } = req.params;
    const userId = req.userId;

    if (userId) {
      await deleteBookService(bookId, userId);

      res.status(201).json({ success: 'Livro excluido com sucesso' });
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export {
  getBookControler,
  getAllBooksController,
  changeStatusBookController,
  deleteBookController,
};
