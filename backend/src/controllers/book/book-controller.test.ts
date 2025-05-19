import {
  getAllBooksController,
  getBookControler,
  changeStatusBookController,
  deleteBookController,
} from './book-controller';
import {
  getAllBooksService,
  getBookService,
  changeStatusBookService,
  deleteBookService,
} from '../../services/book';
import {
  mockBooks,
  mockBook,
  mockRequest,
  mockResponse,
} from '../../__mocks__/controllers/book';

jest.mock('../../services/book', () => ({
  getAllBooksService: jest.fn(),
  getBookService: jest.fn(),
  changeStatusBookService: jest.fn(),
  deleteBookService: jest.fn(),
}));

describe('Book Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllBooksController', () => {
    it('should return a list of books with status 200', async () => {
      (getAllBooksService as jest.Mock).mockResolvedValue(mockBooks);

      await getAllBooksController(mockRequest, mockResponse);

      expect(getAllBooksService).toHaveBeenCalledWith('', 1, 10);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockBooks);
    });

    it('should return error with status 400 if service failed', async () => {
      (getAllBooksService as jest.Mock).mockRejectedValue(
        new Error('Erro ao buscar livros'),
      );

      await getAllBooksController(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Erro ao buscar livros',
      });
    });
  });

  describe('getBookControler', () => {
    it('should return a book with status 200', async () => {
      (getBookService as jest.Mock).mockResolvedValue(mockBook);

      await getBookControler(mockRequest, mockResponse);

      expect(getBookService).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ book: mockBook });
    });

    it('should return error with status 400 if service failed', async () => {
      (getBookService as jest.Mock).mockRejectedValue(
        new Error('Erro ao buscar livro'),
      );

      await getBookControler(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Erro ao buscar livro',
      });
    });
  });

  describe('changeStatusBookController', () => {
    it('should change book status with status 201', async () => {
      (changeStatusBookService as jest.Mock).mockResolvedValue(undefined);

      await changeStatusBookController(mockRequest, mockResponse);

      expect(changeStatusBookService).toHaveBeenCalledWith(
        '1',
        'user123',
        'reading',
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
    });

    it('should return error with status 400 if service failed', async () => {
      (changeStatusBookService as jest.Mock).mockRejectedValue(
        new Error('Erro ao atualizar livro'),
      );

      await changeStatusBookController(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Erro ao atualizar livro',
      });
    });
  });

  describe('deleteBookController', () => {
    it('should delete a book with status 201', async () => {
      (deleteBookService as jest.Mock).mockResolvedValue(undefined);

      await deleteBookController(mockRequest, mockResponse);

      expect(deleteBookService).toHaveBeenCalledWith('1', 'user123');
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: 'Livro excluido com sucesso',
      });
    });

    it('should return error with status 400 if service failed', async () => {
      (deleteBookService as jest.Mock).mockRejectedValue(
        new Error('Erro ao excluir livro'),
      );

      await deleteBookController(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Erro ao excluir livro',
      });
    });
  });
});
