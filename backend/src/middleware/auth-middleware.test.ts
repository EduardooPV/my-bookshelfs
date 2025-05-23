import { AuthenticatedRequest, authMiddleware } from './auth-middleware';
import { supabase } from '../config/database';
import {
  mockRequest,
  mockResponse,
  mockNext,
} from '../__mocks__/middleware/auth';

jest.mock('../config/database', () => ({
  supabase: {
    auth: {
      getUser: jest.fn(),
    },
  },
}));

describe('Auth Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call next() and set userId if token is valid', async () => {
    const mockUser = { id: 'user123' };
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    await authMiddleware(mockRequest, mockResponse, mockNext);

    expect(supabase.auth.getUser).toHaveBeenCalledWith('valid-token');
    expect(mockRequest.userId).toBe('user123');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should return 401 if token is not provided', async () => {
    const reqWithoutToken = {
      cookies: undefined,
    } as unknown as AuthenticatedRequest;

    await authMiddleware(reqWithoutToken, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Token não fornecido',
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 401 if Supabase returns an error', async () => {
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: { user: null },
      error: 'Invalid token',
    });

    await authMiddleware(mockRequest, mockResponse, mockNext);

    expect(supabase.auth.getUser).toHaveBeenCalledWith('valid-token');
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Usuário não autenticado',
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 401 if an unexpected error occurs', async () => {
    (supabase.auth.getUser as jest.Mock).mockRejectedValue(
      new Error('Unexpected error'),
    );

    await authMiddleware(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Erro na autenticação',
      message: expect.any(Error),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
