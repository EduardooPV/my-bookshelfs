import request from 'supertest';
import express from 'express';
import { router as userRoutes } from './user-router';
import { getReadingBookController } from '../../controllers/user';

jest.mock('../../controllers/user', () => ({
  getReadingBookController: jest.fn((req, res) =>
    res.status(200).json({ message: 'Get Reading Books Success' }),
  ),
}));

const app = express();
app.use(express.json());
app.use('/user', userRoutes);

describe('User Routes', () => {
  it('GET /user/reading should call getReadingBookController', async () => {
    const response = await request(app).get('/user/reading');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Get Reading Books Success' });
    expect(getReadingBookController).toHaveBeenCalled();
  });
});
