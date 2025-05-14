import { httpService } from '../../utils/http-service';
import { ISumWishlistBooks } from './resume-wishlist.type';

export const getSumWishlistBooks = async (): Promise<ISumWishlistBooks> => {
  const data = await httpService('/user/wishlist/sum');

  return data;
};
