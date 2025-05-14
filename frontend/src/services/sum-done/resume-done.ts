import { httpService } from '../../utils/http-service';
import { ISumDoneBooks } from './resume-done.type';

export const getSumDoneBooks = async (): Promise<ISumDoneBooks> => {
  const data = await httpService('/user/done/sum');

  return data;
};
