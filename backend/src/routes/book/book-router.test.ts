import request from 'supertest';
import express from 'express';
import { router as bookRoutes } from './book-router';
import {
  getAllBooksController,
  getBookControler,
  readingBookController,
  doneBookController,
  wishlistBookController,
  deleteBookController,
} from '../../controllers/book';

jest.mock('../../controllers/book', () => ({
  getAllBooksController: jest.fn((req, res) =>
    res.status(200).json({ message: 'Get All Books Success' }),
  ),
  getBookControler: jest.fn((req, res) =>
    res.status(200).json({ message: 'Get Book Success' }),
  ),
  readingBookController: jest.fn((req, res) =>
    res.status(201).json({ message: 'Reading Book Success' }),
  ),
  doneBookController: jest.fn((req, res) =>
    res.status(201).json({ message: 'Done Book Success' }),
  ),
  wishlistBookController: jest.fn((req, res) =>
    res.status(201).json({ message: 'Wishlist Book Success' }),
  ),
  deleteBookController: jest.fn((req, res) =>
    res.status(201).json({ message: 'Delete Book Success' }),
  ),
}));

const app = express();
app.use(express.json());
app.use('/book', bookRoutes);

describe('Book Routes', () => {
  it('GET /book should call getAllBooksController', async () => {
    const response = await request(app).get('/book');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Get All Books Success' });
    expect(getAllBooksController).toHaveBeenCalled();
  });

  it('GET /book/:bookId should call getBookControler', async () => {
    const response = await request(app).get('/book/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Get Book Success' });
    expect(getBookControler).toHaveBeenCalled();
  });

  it('POST /book/:bookId/reading should call readingBookController', async () => {
    const response = await request(app).post('/book/1/reading');
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Reading Book Success' });
    expect(readingBookController).toHaveBeenCalled();
  });

  it('POST /book/:bookId/done should call doneBookController', async () => {
    const response = await request(app).post('/book/1/done');
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Done Book Success' });
    expect(doneBookController).toHaveBeenCalled();
  });

  it('POST /book/:bookId/wishlist should call wishlistBookController', async () => {
    const response = await request(app).post('/book/1/wishlist');
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Wishlist Book Success' });
    expect(wishlistBookController).toHaveBeenCalled();
  });

  it('DELETE /book/:bookId should call deleteBookController', async () => {
    const response = await request(app).delete('/book/1');
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Delete Book Success' });
    expect(deleteBookController).toHaveBeenCalled();
  });
});
