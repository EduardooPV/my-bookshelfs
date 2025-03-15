import { Request, Response } from 'express';
import { getAllBooks, getBook } from '../../services/books';

export const getAllBooksController = async (req: Request, res: Response) => {
  try {
    const { search = '', page = 1, limit = 10 } = req.query;

    const books = await getAllBooks(
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
    const { id } = req.params;

    const book = await getBook(id);

    res.status(200).json({ book });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
