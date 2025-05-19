import { Request, Response } from 'express';

const mockBooks = {
  books: [
    { key: '1', title: 'Livro 1', author: 'Autor 1', cover: null },
    { key: '2', title: 'Livro 2', author: 'Autor 2', cover: null },
  ],
  total: 2,
  page: 1,
  totalPages: 1,
};

const mockBook = {
  key: '1',
  title: 'Livro 1',
  author: 'Autor 1',
  cover: null,
};

const mockRequest = {
  query: { search: '', page: '1', limit: '10' },
  params: { bookId: '1' },
  userId: 'user123',
  body: { status: 'reading' },
} as unknown as Request;

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

export { mockBooks, mockBook, mockRequest, mockResponse };
