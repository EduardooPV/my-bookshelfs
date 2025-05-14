import { supabase } from '../../config/database';
import { IBook, IBookListResponse, IOpenLibraryBook } from './types';

const getBookService = async (bookId: string): Promise<IBook> => {
  const baseUrl = 'https://openlibrary.org';

  const workResponse = await fetch(`${baseUrl}/works/${bookId}.json`);

  if (!workResponse.ok) {
    throw new Error('Erro ao buscar livro');
  }

  const workData = await workResponse.json();

  const editionsResponse = await fetch(
    `${baseUrl}/works/${bookId}/editions.json?limit=1`,
  );

  const editionsData = await editionsResponse.json();
  const firstEdition = editionsData.entries[0];

  const book = {
    key: workData.key,
    title: workData.title,
    author: workData.authors?.[0]?.author?.key
      ? await getAuthorName(workData.authors[0].author.key)
      : 'Autor desconhecido',
    cover: firstEdition?.covers?.[0]
      ? `https://covers.openlibrary.org/b/id/${firstEdition.covers[0]}-L.jpg`
      : null,
    description:
      typeof workData.description === 'object'
        ? workData.description.value
        : typeof workData.description === 'string'
          ? workData.description
          : '',
  };

  return book;
};

const getAllBooksService = async (
  searchQuery: string,
  page = 1,
  limit = 10,
): Promise<IBookListResponse> => {
  const baseUrl = 'https://openlibrary.org/search.json';
  const offset = (page - 1) * limit;

  const fields = ['key', 'title', 'author_name', 'cover_i'].join(',');

  const response = await fetch(
    `${baseUrl}?q=${encodeURIComponent(searchQuery)}&offset=${offset}&limit=${limit}&fields=${fields}`,
  );

  if (!response.ok) {
    throw new Error('Erro ao buscar livros');
  }

  const data = await response.json();

  const books = data.docs.map((book: IOpenLibraryBook) => ({
    key: book.key.replace('/works/', ''),
    title: book.title,
    author: book.author_name?.[0] || 'Autor desconhecido',
    cover: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : null,
  }));

  return {
    books,
    total: data.numFound,
    page,
    totalPages: Math.ceil(data.numFound / limit),
  };
};

const getAuthorName = async (authorKey: string) => {
  const response = await fetch(`https://openlibrary.org${authorKey}.json`);
  const data = await response.json();
  return data.name || 'Autor desconhecido';
};

const changeStatusBookService = async (
  bookId: string,
  userId: string,
  status: string,
) => {
  const { data: bookAlreadyExist } = await supabase
    .from('books')
    .select('*')
    .eq('book_id', bookId)
    .eq('user_id', userId)
    .single();

  if (bookAlreadyExist) {
    const { data, error } = await supabase
      .from('books')
      .update({
        status,
        start_at: status === 'reading' ? new Date() : null,
        completion_at: status === 'done' ? new Date() : null,
      })
      .eq('book_id', bookId)
      .eq('user_id', userId)
      .select();
    if (error) {
      throw new Error(`Erro ao atualizar o livro: ${error.message}`);
    }

    return data;
  }

  const book = await getBookService(bookId);

  const { data, error } = await supabase
    .from('books')
    .insert([
      {
        book_id: bookId,
        user_id: userId,
        author: book.author,
        title: book.title,
        cover: book.cover,
        description: book.description,
        status,
        start_at: status === 'reading' ? new Date() : null,
        completion_at: status === 'done' ? new Date() : null,
      },
    ])
    .select();

  if (error) {
    throw new Error(`Erro ao atualizar o livro: ${error.message}`);
  }
  return data;
};

const deleteBookService = async (bookId: string, userId: string) => {
  const { data: bookAlreadyExist } = await supabase
    .from('books')
    .select('*')
    .eq('book_id', bookId)
    .eq('user_id', userId)
    .single();

  if (!bookAlreadyExist) {
    throw new Error('Livro não encontrado');
  }

  const { error } = await supabase
    .from('books')
    .delete()
    .eq('book_id', bookId)
    .eq('user_id', userId);

  if (error) {
    throw new Error('Livro ao excluir o livro');
  }
};

export {
  getBookService,
  getAllBooksService,
  changeStatusBookService,
  deleteBookService,
};
