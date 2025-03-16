import { Router } from 'express';
import {
  addToWishlistController,
  getAllWishlistItemsController,
  removeFromWishlistController,
  updateWishlistController,
} from '../controllers/wishlist';

const router = Router();

router.put('/:bookId', addToWishlistController);
router.get('/', getAllWishlistItemsController);
router.delete('/:bookId', removeFromWishlistController);
router.patch('/:bookId', updateWishlistController);

export default router;
