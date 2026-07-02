import { Router } from 'express';
import {
  signUpController,
  signInController,
  signOutController,
  forgotPasswordController,
  resetPasswordController,
  setCookieController,
} from '../../controllers/auth';

const router = Router();

router.post('/signup', signUpController);
router.post('/signin', signInController);
router.post('/signout', signOutController);
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', resetPasswordController);
router.post('/set-cookie', setCookieController);

export { router };
