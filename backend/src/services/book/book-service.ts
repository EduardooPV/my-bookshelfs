import { supabase } from '../../config/database';
import { IBook, IBookListResponse, IOpenLibraryBook } from './types';

export const getBookService = async (bookId: string): Promise<IBook> => {
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

export const getAllBooksService = async (
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

export const readingBookService = async (bookId: string, userId: string) => {
  const book = await getBookService(bookId);

  const { data: bookAlreadyExist, error: checkError } = await supabase
    .from('books')
    .select('book_id')
    .eq('book_id', bookId)
    .eq('user_id', userId)
    .maybeSingle();

  if (checkError) {
    throw new Error('Erro ao verificar livro');
  }

  if (bookAlreadyExist) {
    throw new Error('Você já está lendo este livro.');
  }

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
        status: 'reading',
      },
    ])
    .select();

  if (error) {
    throw new Error(`Erro ao inserir livro: ${error.message}`);
  }

  return data;
};

export const deleteBookService = () => {};
export const doneBookService = () => {};
export const wishlistBookService = () => {};
