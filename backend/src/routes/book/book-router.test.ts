import request from 'supertest';
import express from 'express';
import { router as bookRoutes } from './book-router';
import {
  getAllBooksController,
  getBookControler,
  deleteBookController,
  changeStatusBookController,
} from '../../controllers/book';

jest.mock('../../controllers/book', () => ({
  getAllBooksController: jest.fn((req, res) =>
    res.status(200).json({ message: 'Get All Books Success' }),
  ),
  getBookControler: jest.fn((req, res) =>
    res.status(200).json({ message: 'Get Book Success' }),
  ),
  changeStatusBookController: jest.fn((req, res) =>
    res.status(201).json({ message: 'Reading Book Success' }),
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

  it('POST /book/:bookId/status should call changeStatusBookController', async () => {
    const response = await request(app)
      .post('/book/1/status')
      .send({ status: 'reading' });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Reading Book Success' });
    expect(changeStatusBookController).toHaveBeenCalled();
  });

  it('DELETE /book/:bookId should call deleteBookController', async () => {
    const response = await request(app).delete('/book/1');
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Delete Book Success' });
    expect(deleteBookController).toHaveBeenCalled();
  });
});
