import { Router } from 'express';
import {
  signUpController,
  signInController,
  signOutController,
  forgotPasswordController,
  resetPasswordController,
} from '../../controllers/auth';

const router = Router();

router.post('/signup', signUpController);
router.post('/signin', signInController);
router.post('/signout', signOutController);
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', resetPasswordController);

export { router };
