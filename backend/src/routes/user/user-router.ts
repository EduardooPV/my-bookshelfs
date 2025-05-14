import { Router } from 'express';
import {
  getReadingBookController,
  getSumReadingBookController,
  getWishlistBookController,
  getSumWishlistBooksController,
  getDoneBookController,
  getSumDoneBookController,
} from '../../controllers/user';

const router = Router();

router.get('/reading', getReadingBookController);
router.get('/reading/sum', getSumReadingBookController);
router.get('/wishlist', getWishlistBookController);
router.get('/wishlist/sum', getSumWishlistBooksController);
router.get('/done', getDoneBookController);
router.get('/done/sum', getSumDoneBookController);

export { router };
