import { Router } from 'express';
import {
  getReadingBookController,
  getSumReadingBookController,
} from '../../controllers/user';

const router = Router();

router.get('/reading', getReadingBookController);
router.get('/reading/sum', getSumReadingBookController);

export { router };
