import { supabase } from '../../config/database';

const getBookStatusService = async (userId: string, status: string) => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('user_id', userId)
    .eq('status', status)
    .order('start_at', { ascending: false });

  if (error) {
    throw new Error(`Erro ao buscar livros: ${error.message}`);
  }

  return data;
};

const getCountBookStatusService = async (userId: string, status: string) => {
  const { count, error } = await supabase
    .from('books')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .eq('status', status);

  if (error) {
    throw new Error(`Erro ao buscar livros: ${error.message}`);
  }

  return { count };
};

export { getBookStatusService, getCountBookStatusService };
