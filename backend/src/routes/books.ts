import { Router } from 'express';
import { getAllBooksController, getBookControler } from '../controllers/book';

const router = Router();

router.get('/', getAllBooksController);
router.get('/:id', getBookControler);

export default router;
