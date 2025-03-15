import { Request, Response } from 'express';
import {
  addBookWishList,
  getAllWishlistItems,
  removeFromWishlist,
  updateWishlist,
} from '../../services/wishlist';
import { IRequestWithUser } from '../../types';

export const addToWishlistController = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const { priority } = req.query;
    const userId = (req as IRequestWithUser).userId;

    if (!userId) {
      res.status(401).json({
        error: 'Usuário não autenticado',
      });
      return;
    }

    const wishlistItem = await addBookWishList({
      userId,
      bookId,
      priority: priority ? Number(priority) : 0,
    });

    res.status(201).json(wishlistItem);
  } catch (error) {
    res.status(400).json({
      error: (error as Error).message,
    });
  }
};

export const getAllWishlistItemsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = (req as IRequestWithUser).userId;

    if (!userId) {
      res.status(401).json({
        error: 'Usuário não autenticado',
      });
      return;
    }

    const wishlists = await getAllWishlistItems(userId);

    res.status(201).json(wishlists);
  } catch (error) {
    res.status(400).json({
      error: (error as Error).message,
    });
  }
};

export const removeFromWishlistController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { bookId } = req.params;
    const userId = (req as IRequestWithUser).userId;

    if (!userId) {
      res.status(401).json({
        error: 'Usuário não autenticado',
      });
      return;
    }

    const wishlistRemoved = await removeFromWishlist({ userId, bookId });

    res.status(200).json(wishlistRemoved);
  } catch (error) {
    res.status(400).json({
      error: (error as Error).message,
    });
  }
};

export const updateWishlistController = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const { priority } = req.query;
    const userId = (req as IRequestWithUser).userId;

    if (!userId) {
      res.status(401).json({
        error: 'Usuário não autenticado',
      });
      return;
    }

    const wishlistUpdated = await updateWishlist({
      userId,
      bookId,
      priority: priority ? Number(priority) : 0,
    });

    res.status(200).json(wishlistUpdated);
  } catch (error) {
    res.status(400).json({
      error: (error as Error).message,
    });
  }
};
