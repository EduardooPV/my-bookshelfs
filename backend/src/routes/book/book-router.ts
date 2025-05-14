import { Router } from 'express';
import {
  getAllBooksController,
  deleteBookController,
  getBookControler,
  changeStatusBookController,
} from '../../controllers/book';

const router = Router();

router.get('/', getAllBooksController);
router.get('/:bookId', getBookControler);
router.post('/:bookId/status', changeStatusBookController);
router.delete('/:bookId', deleteBookController);

export { router };
