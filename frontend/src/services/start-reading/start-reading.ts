import { httpService } from '../../utils/http-service';
import { IStartReadingBook } from './start-reading.type';

export const startReadingBook = async (bookId: string): Promise<IStartReadingBook> => {
  const data = await httpService(`/book/${bookId}/reading`, {
    method: 'POST',
  });

  return data;
};
