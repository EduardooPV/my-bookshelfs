import { httpService } from '../../utils/http-service';
import { ICountStatusBook } from './count-status-book.type';

export const getCountStatusBooks = async (status: string): Promise<ICountStatusBook> => {
  const data = await httpService(`/me/books/count?status=${status}`);

  return data;
};
