import request from 'supertest';
import express from 'express';
import authRoutes from './auth';
import {
  signUpController,
  signInController,
  signOutController,
  forgotPasswordController,
  resetPasswordController,
} from '../../controllers/auth';

jest.mock('../../controllers/auth', () => ({
  signUpController: jest.fn((req, res) =>
    res.status(201).json({ message: 'SignUp Success' }),
  ),
  signInController: jest.fn((req, res) =>
    res.status(200).json({ message: 'SignIn Success' }),
  ),
  signOutController: jest.fn((req, res) =>
    res.status(200).json({ message: 'SignOut Success' }),
  ),
  forgotPasswordController: jest.fn((req, res) =>
    res.status(200).json({ message: 'Forgot Password Success' }),
  ),
  resetPasswordController: jest.fn((req, res) =>
    res.status(200).json({ message: 'Reset Password Success' }),
  ),
}));

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Auth Routes', () => {
  it('POST /auth/signup should call signUpController', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'SignUp Success' });
    expect(signUpController).toHaveBeenCalled();
  });

  it('POST /auth/signin should call signInController', async () => {
    const response = await request(app)
      .post('/auth/signin')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'SignIn Success' });
    expect(signInController).toHaveBeenCalled();
  });

  it('POST /auth/signout should call signOutController', async () => {
    const response = await request(app).post('/auth/signout');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'SignOut Success' });
    expect(signOutController).toHaveBeenCalled();
  });

  it('POST /auth/forgot-password should call forgotPasswordController', async () => {
    const response = await request(app)
      .post('/auth/forgot-password')
      .send({ email: 'test@example.com' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Forgot Password Success' });
    expect(forgotPasswordController).toHaveBeenCalled();
  });

  it('POST /auth/reset-password should call resetPasswordController', async () => {
    const response = await request(app)
      .post('/auth/reset-password')
      .send({ password: 'newpassword123' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Reset Password Success' });
    expect(resetPasswordController).toHaveBeenCalled();
  });
});
