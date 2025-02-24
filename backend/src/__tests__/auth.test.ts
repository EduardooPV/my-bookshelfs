import request from 'supertest';
import { app, server } from '../index';
import * as authService from '../services/authService';

jest.mock('../services/authService');

afterAll(async () => {
  jest.clearAllMocks();
  server.close();
});

describe('Auth Routes', () => {
  const mockUser = { id: 'password123', email: 'test@example.com' };

  it('should create user and return status code 200', async () => {
    (authService.signUp as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app)
      .post('/auth/signup')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ user: mockUser });
  });

  it('should return 400 if signout service failed', async () => {
    (authService.signUp as jest.Mock).mockRejectedValue(
      new Error('Erro ao criar usuário'),
    );

    const response = await request(app)
      .post('/auth/signup')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(400);
  });

  it('should authenticate user and return status code 200', async () => {
    (authService.signIn as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app)
      .post('/auth/signin')
      .send({ email: 'test@exemple.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ session: mockUser });
  });

  it('should return 400 if authenticate service failed', async () => {
    (authService.signIn as jest.Mock).mockRejectedValue(
      new Error('Erro ao autenticar o usuário!'),
    );

    const response = await request(app)
      .post('/auth/signin')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(400);
  });

  it('should signout user and return status code 200', async () => {
    (authService.signOut as jest.Mock).mockResolvedValue('Usuário deslogado');

    const response = await request(app).post('/auth/signout');

    expect(response.status).toBe(200);
  });

  it('should return 400 if signout service failed', async () => {
    (authService.signOut as jest.Mock).mockRejectedValue(
      new Error('Erro ao deslogar o usuário!'),
    );

    const response = await request(app).post('/auth/signout');

    expect(response.status).toBe(400);
  });

  it('should send email to reset password and return status code 200', async () => {
    (authService.forgotPassword as jest.Mock).mockResolvedValue(
      'Email enviado com sucesso',
    );

    const response = await request(app)
      .post('/auth/forgot-password')
      .send({ email: 'test@example.com' });

    expect(response.status).toBe(200);
  });

  it('should return 400 if forgot password service failed', async () => {
    (authService.forgotPassword as jest.Mock).mockRejectedValue(
      new Error('Erro ao enviar email'),
    );

    const response = await request(app)
      .post('/auth/forgot-password')
      .send({ email: 'test@example.com' });

    expect(response.status).toBe(400);
  });

  it('should reset password and return status code 200', async () => {
    (authService.resetPassword as jest.Mock).mockResolvedValue(
      'Senha redefinida com sucesso',
    );

    const response = await request(app)
      .post('/auth/reset-password')
      .send({ password: 'password123asd' });

    expect(response.status).toBe(200);
  });

  it('should return 400 if reset password service failed', async () => {
    (authService.resetPassword as jest.Mock).mockRejectedValue(
      new Error('Erro ao redefinir senha'),
    );

    const response = await request(app)
      .post('/auth/reset-password')
      .send({ password: 'password123asd' });

    expect(response.status).toBe(400);
  });
});
