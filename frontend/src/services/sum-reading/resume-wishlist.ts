import { httpService } from '../../utils/http-service';
import { ISumReadingBooks } from './resume-wishlist.type';

export const getSumReadingBooks = async (): Promise<ISumReadingBooks> => {
  const data = await httpService('/user/reading/sum');

  return data;
};
