import { getAllBooks, getBook } from '../services/book';
import {
  mockSearchResponse,
  mockBookDetails,
  mockFormattedBookResponse,
} from './__mocks__/books';

global.fetch = jest.fn();

describe('Books Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllBooks', () => {
    it('should return formatted books list', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSearchResponse),
      });

      const result = await getAllBooks('test query', 1, 10);
      expect(result.books).toHaveLength(2);
      expect(result.books[0].key).toBe('OL1234W');
    });

    it('should handle API errors', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
      await expect(getAllBooks('test query', 1, 10)).rejects.toThrow(
        'Erro ao buscar livros',
      );
    });
  });

  describe('getBook', () => {
    it('should return formatted book details', async () => {
      const {
        workData,
        ratingsData,
        editionsData,
        editionDetails,
        authorData,
      } = mockBookDetails;

      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(workData),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(ratingsData),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(editionsData),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(editionDetails),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(authorData),
        });

      const result = await getBook('OL1234W');
      expect(result).toEqual(mockFormattedBookResponse);
    });

    it('should handle API errors', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
      await expect(getBook('OL1234W')).rejects.toThrow('Erro ao buscar livro');
    });
  });
});
