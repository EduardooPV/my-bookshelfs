import { Router } from 'express';
import { getAllBooksController } from '../controllers/booksController';

const router = Router();

router.get('/', getAllBooksController);

export default router;
