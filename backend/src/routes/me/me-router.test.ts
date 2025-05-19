import request from 'supertest';
import express from 'express';
import { router as meRoutes } from './me-router';
import {
  getBooksStatusController,
  getCountBooksStatusController,
} from '../../controllers/me';

jest.mock('../../controllers/me', () => ({
  getBooksStatusController: jest.fn((req, res) =>
    res.status(200).json({ message: 'Get Books Status Success' }),
  ),
  getCountBooksStatusController: jest.fn((req, res) =>
    res.status(200).json({ count: 2 }),
  ),
}));

const app = express();
app.use(express.json());
app.use('/me', meRoutes);

describe('Me Routes', () => {
  it('GET /me/books should call getBooksStatusController', async () => {
    const response = await request(app).get('/me/books');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Get Books Status Success' });
    expect(getBooksStatusController).toHaveBeenCalled();
  });

  it('GET /me/books/count should call getCountBooksStatusController', async () => {
    const response = await request(app).get('/me/books/count');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ count: 2 });
    expect(getCountBooksStatusController).toHaveBeenCalled();
  });
});
