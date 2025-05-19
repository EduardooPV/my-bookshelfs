import { httpService } from '../../utils/http-service';
import { IGetStatusBook } from './get-status-book.type';

export const getStatusBook = async (status?: string): Promise<IGetStatusBook[]> => {
  const url = status ? `/me/books?status=${status}` : '/me/books';
  const data = await httpService(url);

  return data;
};
