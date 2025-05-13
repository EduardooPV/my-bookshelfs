import { Request, Response } from 'express';

export const mockRequest = {
  userId: 'user123',
} as unknown as Request;

export const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

export const mockBooks = [
  { id: '1', title: 'Book 1', author: 'Author 1' },
  { id: '2', title: 'Book 2', author: 'Author 2' },
];
