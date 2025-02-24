import { Router } from 'express';
import {
  signUpController,
  signInController,
  signOutController,
} from '../controllers/authController';

const router = Router();

router.post('/signup', signUpController);
router.post('/signin', signInController);
router.post('/signout', signOutController);

export default router;
