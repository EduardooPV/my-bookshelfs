import { httpService } from '../../utils/http-service';
import { ISearchBooks } from './search-books.type';

export const searchBooks = async (
  search: string,
  page: number = 1,
  limit: number = 5,
): Promise<ISearchBooks> => {
  const params = new URLSearchParams({
    search,
    page: page.toString(),
    limit: limit.toString(),
  });

  const data = await httpService(`/book?${params.toString()}`);

  return data;
};
