import { httpService } from '../../utils/http-service';
import { IWishlistBooks } from './list-wishlist.type';

export const getWishlistBooks = async (): Promise<IWishlistBooks[]> => {
  const data = await httpService('/user/wishlist');

  return data;
};
