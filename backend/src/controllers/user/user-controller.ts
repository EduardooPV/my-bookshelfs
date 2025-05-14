import { Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth-middleware';
import {
  getReadingBooksService,
  getSumReadingBooksService,
  getWishlistBooksService,
  getSumWishlistBooksService,
  getDoneBooksService,
  getSumDoneBooksService,
} from '../../services/user';

const getReadingBookController = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.userId;

    if (userId) {
      const books = await getReadingBooksService(userId);

      res.status(200).json(books);
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

const getSumReadingBookController = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.userId;

    if (userId) {
      const books = await getSumReadingBooksService(userId);

      res.status(200).json(books);
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

const getWishlistBookController = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.userId;
    if (userId) {
      const books = await getWishlistBooksService(userId);
      res.status(200).json(books);
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

const getSumWishlistBooksController = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.userId;

    if (userId) {
      const books = await getSumWishlistBooksService(userId);

      res.status(200).json(books);
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

const getDoneBookController = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.userId;
    if (userId) {
      const books = await getDoneBooksService(userId);
      res.status(200).json(books);
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

const getSumDoneBookController = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.userId;

    if (userId) {
      const books = await getSumDoneBooksService(userId);

      res.status(200).json(books);
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export {
  getReadingBookController,
  getSumReadingBookController,
  getWishlistBookController,
  getSumWishlistBooksController,
  getDoneBookController,
  getSumDoneBookController,
};
