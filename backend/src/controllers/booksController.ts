import { Request, Response } from 'express';
import { getAllBooks } from '../services/booksService';

export const getAllBooksController = async (req: Request, res: Response) => {
  try {
    const books = await getAllBooks();

    res.status(200).json({ books });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
