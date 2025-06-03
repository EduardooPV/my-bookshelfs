import { Response } from 'express';
import { AuthenticatedRequest } from '../../../middleware/auth-middleware';

const mockRequest = {
  cookies: { access_token: 'valid-token' },
} as unknown as AuthenticatedRequest;

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

const mockNext = jest.fn();

export { mockRequest, mockResponse, mockNext };
