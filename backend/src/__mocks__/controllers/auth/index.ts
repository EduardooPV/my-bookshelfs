import { Request, Response } from 'express';

const mockUser = { id: 'user123', email: 'test@example.com' };
const mockSession = { token: 'abc123', user: mockUser };
const mockResponseMessage = { message: 'Success' };

const mockRequest = {
  body: { email: 'test@example.com', password: 'password123' },
} as unknown as Request;

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  cookie: jest.fn(),
  clearCookie: jest.fn(),
} as unknown as Response;

export {
  mockUser,
  mockSession,
  mockResponseMessage,
  mockRequest,
  mockResponse,
};
