import { Router } from 'express';
import {
  getAllBooksController,
  deleteBookController,
  getBookControler,
  readingBookController,
  doneBookController,
  wishlistBookController,
} from '../../controllers/book';

const router = Router();

router.get('/:bookId', getBookControler);
router.get('/', getAllBooksController);
router.post('/:bookId/reading', readingBookController);
router.post('/:bookId/done', doneBookController);
router.post('/:bookId/wishlist', wishlistBookController);
router.delete('/:bookId', deleteBookController);

export { router };
