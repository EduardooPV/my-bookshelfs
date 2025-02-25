import { Router } from 'express';
import {
  signUpController,
  signInController,
  signOutController,
  forgotPasswordController,
  resetPasswordController,
} from '../controllers/authController';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello from Vercel!' });
});
router.post('/signup', signUpController);
router.post('/signin', signInController);
router.post('/signout', signOutController);
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', resetPasswordController);

export default router;
