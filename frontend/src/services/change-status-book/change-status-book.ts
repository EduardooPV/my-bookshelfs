import { httpService } from '../../utils/http-service';
import { IChangeStatusBook } from './change-status-book.type';

export const changeStatusBook = async (
  bookId: string,
  status: string,
): Promise<IChangeStatusBook> => {
  const data = await httpService(`/book/${bookId}/status`, {
    method: 'POST',
    body: JSON.stringify({ status }),
  });

  return data;
};
