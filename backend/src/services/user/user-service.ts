import { supabase } from '../../config/database';
import { logger } from '../../utils/logger';

const getReadingBooksService = async (userId: string) => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'reading')
    .order('start_at', { ascending: false });

  if (error) {
    throw new Error(`Erro ao buscar livros: ${error.message}`);
  }
  return data;
};

const getSumReadingBooksService = async (userId: string) => {
  const { count, error } = await supabase
    .from('books')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .eq('status', 'reading');

  if (error) {
    throw new Error(`Erro ao buscar livros: ${error.message}`);
  }
  return { total: count };
};

const getWishlistBooksService = async (userId: string) => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'wishlist');

  if (error) {
    throw new Error(`Erro ao buscar livros: ${error.message}`);
  }
  return data;
};

const getSumWishlistBooksService = async (userId: string) => {
  const { count, error } = await supabase
    .from('books')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .eq('status', 'wishlist');

  if (error) {
    throw new Error(`Erro ao buscar livros: ${error.message}`);
  }
  return { total: count };
};

const getDoneBooksService = async (userId: string) => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'done');

  if (error) {
    throw new Error(`Erro ao buscar livros: ${error.message}`);
  }
  return data;
};

const getSumDoneBooksService = async (userId: string) => {
  const { count, error } = await supabase
    .from('books')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .eq('status', 'done');

  if (error) {
    throw new Error(`Erro ao buscar livros: ${error.message}`);
  }
  return { total: count };
};

export {
  getReadingBooksService,
  getSumReadingBooksService,
  getWishlistBooksService,
  getSumWishlistBooksService,
  getDoneBooksService,
  getSumDoneBooksService,
};
