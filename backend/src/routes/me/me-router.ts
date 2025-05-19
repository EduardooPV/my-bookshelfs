import { Router } from 'express';
import {
  getBooksStatusController,
  getCountBooksStatusController,
} from '../../controllers/me';

const router = Router();

router.get('/books', getBooksStatusController);
router.get('/books/count', getCountBooksStatusController);

export { router };
