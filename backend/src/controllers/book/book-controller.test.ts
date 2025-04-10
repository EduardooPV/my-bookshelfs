import {
  getAllBooksController,
  getBookControler,
  readingBookController,
  doneBookController,
  wishlistBookController,
  deleteBookController,
} from './book-controller';
import {
  getAllBooksService,
  getBookService,
  readingBookService,
  doneBookService,
  wishlistBookService,
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
  readingBookService: jest.fn(),
  doneBookService: jest.fn(),
  wishlistBookService: jest.fn(),
  deleteBookService: jest.fn(),
}));

describe('Book Controller', () => {
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

  describe('readingBookController', () => {
    it('should mark a book as reading with status 201', async () => {
      (readingBookService as jest.Mock).mockResolvedValue(mockBook);

      await readingBookController(mockRequest, mockResponse);

      expect(readingBookService).toHaveBeenCalledWith('1', 'user123');
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ book: mockBook });
    });

    it('should return error with status 400 if service failed', async () => {
      (readingBookService as jest.Mock).mockRejectedValue(
        new Error('Erro ao marcar como lendo'),
      );

      await readingBookController(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Erro ao marcar como lendo',
      });
    });
  });

  describe('doneBookController', () => {
    it('should mark a book as done with status 201', async () => {
      (doneBookService as jest.Mock).mockResolvedValue(mockBook);

      await doneBookController(mockRequest, mockResponse);

      expect(doneBookService).toHaveBeenCalledWith('1', 'user123');
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ book: mockBook });
    });

    it('should return error with status 400 if service failed', async () => {
      (doneBookService as jest.Mock).mockRejectedValue(
        new Error('Erro ao marcar como concluído'),
      );

      await doneBookController(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Erro ao marcar como concluído',
      });
    });
  });

  describe('wishlistBookController', () => {
    it('should add a book to wishlist with status 201', async () => {
      (wishlistBookService as jest.Mock).mockResolvedValue(mockBook);

      await wishlistBookController(mockRequest, mockResponse);

      expect(wishlistBookService).toHaveBeenCalledWith('1', 'user123');
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ book: mockBook });
    });

    it('should return error with status 400 if service failed', async () => {
      (wishlistBookService as jest.Mock).mockRejectedValue(
        new Error('Erro ao adicionar à lista de desejos'),
      );

      await wishlistBookController(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Erro ao adicionar à lista de desejos',
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
