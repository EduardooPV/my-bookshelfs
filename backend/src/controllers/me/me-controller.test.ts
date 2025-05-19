import { getBooksStatusController } from './me-controller';
import { getBookStatusService } from '../../services/me';
import { mockRequest, mockResponse } from '../../__mocks__/controllers/me';

jest.mock('../../services/me', () => ({
  getBookStatusService: jest.fn(),
}));

describe('Me Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBooksStatusController', () => {
    it('should return a list of books with status 200', async () => {
      const mockBooks = [
        { id: 1, title: 'Book 1' },
        { id: 2, title: 'Book 2' },
      ];
      (getBookStatusService as jest.Mock).mockResolvedValue(mockBooks);

      await getBooksStatusController(mockRequest, mockResponse);

      expect(getBookStatusService).toHaveBeenCalledWith('user123', 'reading');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockBooks);
    });

    it('should return error with status 400 if service fails', async () => {
      (getBookStatusService as jest.Mock).mockRejectedValue(
        new Error('Failed to fetch books'),
      );

      await getBooksStatusController(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Failed to fetch books',
      });
    });

    it('should return error with status 400 if userId is missing', async () => {
      await getBooksStatusController(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
  });
});
