import { Router } from 'express';
import { signUpController } from '../controllers/authController';

const router = Router();

router.post('/signup', signUpController);

export default router;
