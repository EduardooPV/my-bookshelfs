import {
  signUpController,
  signInController,
  signOutController,
  forgotPasswordController,
  resetPasswordController,
} from './auth-controller';
import {
  signUp,
  signIn,
  signOut,
  forgotPassword,
  resetPassword,
} from '../../services/auth';
import {
  mockUser,
  mockSession,
  mockResponseMessage,
  mockRequest,
  mockResponse,
} from '../../__mocks__/controllers/auth';

jest.mock('../../services/auth', () => ({
  signUp: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
  forgotPassword: jest.fn(),
  resetPassword: jest.fn(),
}));

describe('Auth Controller', () => {
  describe('signUpController', () => {
    it('should return the created user with status 201', async () => {
      (signUp as jest.Mock).mockResolvedValue(mockUser);

      await signUpController(mockRequest, mockResponse);

      expect(signUp).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ user: mockUser });
    });

    it('should return error with status 400 if service failed', async () => {
      (signUp as jest.Mock).mockRejectedValue(
        new Error('Erro ao criar usuário'),
      );

      await signUpController(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Erro ao criar usuário',
      });
    });
  });

  describe('signInController', () => {
    it('should return the session with status 200', async () => {
      (signIn as jest.Mock).mockResolvedValue(mockSession);

      await signInController(mockRequest, mockResponse);

      expect(signIn).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ session: mockSession });
    });

    it('should return error with status 400 if service failed', async () => {
      (signIn as jest.Mock).mockRejectedValue(
        new Error('Erro ao autenticar usuário'),
      );

      await signInController(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Erro ao autenticar usuário',
      });
    });
  });

  describe('signOutController', () => {
    it('should return success message with status 200', async () => {
      (signOut as jest.Mock).mockResolvedValue(mockResponseMessage);

      await signOutController(mockRequest, mockResponse);

      expect(signOut).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        out: mockResponseMessage,
      });
    });

    it('should return error with status 400 if service failed', async () => {
      (signOut as jest.Mock).mockRejectedValue(new Error('Erro ao deslogar'));

      await signOutController(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Erro ao deslogar',
      });
    });
  });

  describe('forgotPasswordController', () => {
    it('should return success message with status 200', async () => {
      (forgotPassword as jest.Mock).mockResolvedValue(mockResponseMessage);

      await forgotPasswordController(mockRequest, mockResponse);

      expect(forgotPassword).toHaveBeenCalledWith('test@example.com');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        response: mockResponseMessage,
      });
    });

    it('should return error with status 400 if service failed', async () => {
      (forgotPassword as jest.Mock).mockRejectedValue(
        new Error('Erro ao enviar email'),
      );

      await forgotPasswordController(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Erro ao enviar email',
      });
    });
  });

  describe('resetPasswordController', () => {
    it('should return success message with status 200', async () => {
      (resetPassword as jest.Mock).mockResolvedValue(mockResponseMessage);

      await resetPasswordController(mockRequest, mockResponse);

      expect(resetPassword).toHaveBeenCalledWith('password123');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        response: mockResponseMessage,
      });
    });

    it('should return error with status 400 if service failed', async () => {
      (resetPassword as jest.Mock).mockRejectedValue(
        new Error('Erro ao redefinir senha'),
      );

      await resetPasswordController(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Erro ao redefinir senha',
      });
    });
  });
});
