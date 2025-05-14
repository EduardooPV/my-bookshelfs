import { getReadingBookController } from './me-controller';
import { getReadingBooksService } from '../../services/me';
import { mockRequest, mockResponse } from '../../__mocks__/controllers/user';

jest.mock('../../services/user', () => ({
  getReadingBooksService: jest.fn(),
}));

describe('User Controller', () => {
  describe('getReadingBookController', () => {
    it('should return a list of books with status 200', async () => {
      const mockBooks = [
        { id: 1, title: 'Book 1' },
        { id: 2, title: 'Book 2' },
      ];
      (getReadingBooksService as jest.Mock).mockResolvedValue(mockBooks);

      await getReadingBookController(mockRequest, mockResponse);

      expect(getReadingBooksService).toHaveBeenCalledWith('user123');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockBooks);
    });

    it('should return error with status 400 if service fails', async () => {
      (getReadingBooksService as jest.Mock).mockRejectedValue(
        new Error('Failed to fetch books'),
      );

      await getReadingBookController(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Failed to fetch books',
      });
    });

    it('should return error with status 400 if userId is missing', async () => {
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Failed to fetch books',
      });
    });
  });
});
