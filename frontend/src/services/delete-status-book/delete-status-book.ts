import { httpService } from '../../utils/http-service';
import { IDeleteStatusBook } from './delete-status-book.type';

export const deleteBookStatus = async (bookId?: string): Promise<IDeleteStatusBook> => {
  const data = await httpService(`/book/${bookId}`, { method: 'DELETE' });

  return data;
};
