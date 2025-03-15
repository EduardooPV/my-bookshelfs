import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseKey } from '../../config/env';

const supabase = createClient(supabaseUrl, supabaseKey);

interface AddBookWishListParams {
  userId: string;
  bookId: string;
  priority?: number;
}

export const addBookWishList = async ({
  userId,
  bookId,
  priority,
}: AddBookWishListParams) => {
  const { data: existingBook } = await supabase
    .from('wishlist')
    .select()
    .eq('user_id', userId)
    .eq('book_id', bookId)
    .single();

  if (existingBook) {
    throw new Error('Este livro já está na sua lista de desejos');
  }

  const { data, error } = await supabase
    .from('wishlist')
    .insert([
      {
        user_id: userId,
        book_id: bookId,
        priority,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error('Erro ao adicionar livro na lista de desejos');
  }

  return data;
};

export const getAllWishlistItems = async (userId: string) => {
  const { data, error } = await supabase
    .from('wishlist')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    throw new Error('Erro ao buscar os livros na lista de desejos');
  }

  return data;
};

export const removeFromWishlist = async ({
  userId,
  bookId,
}: {
  userId: string;
  bookId: string;
}) => {
  const { data, error } = await supabase
    .from('wishlist')
    .delete()
    .eq('user_id', userId)
    .eq('book_id', bookId)
    .select();

  if (data?.length === 0) {
    throw new Error('Livro não encontrado');
  }

  if (error) {
    throw new Error('Erro ao deletar o livro da lista de desejos');
  }

  return data;
};

export const updateWishlist = async ({
  userId,
  bookId,
  priority,
}: AddBookWishListParams) => {
  const { data: existingBook } = await supabase
    .from('wishlist')
    .select()
    .eq('user_id', userId)
    .eq('book_id', bookId)
    .single();

  if (!existingBook) {
    throw new Error('Não foi possível encontrar o livro na lista de desejos');
  }

  const { data, error } = await supabase
    .from('wishlist')
    .update({
      priority,
    })
    .eq('user_id', userId)
    .eq('book_id', bookId)
    .select()
    .single();

  if (error) {
    throw new Error('Erro ao atualizar o livro na lista de desejos');
  }

  return data;
};
