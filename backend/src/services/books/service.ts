import { IBook, IBookListResponse, IOpenLibraryBook } from './types';

export const getBook = async (workId: string): Promise<IBook> => {
  const baseUrl = 'https://openlibrary.org';

  const workResponse = await fetch(`${baseUrl}/works/${workId}.json`);

  if (!workResponse.ok) {
    throw new Error('Erro ao buscar livro');
  }

  const workData = await workResponse.json();

  const ratingsResponse = await fetch(
    `${baseUrl}/works/${workId}/ratings.json`,
  );

  const ratingsData = await ratingsResponse.json();

  const editionsResponse = await fetch(
    `${baseUrl}/works/${workId}/editions.json?limit=1`,
  );

  const editionsData = await editionsResponse.json();
  const firstEdition = editionsData.entries[0];

  let editionDetails = null;

  if (firstEdition?.key) {
    const editionResponse = await fetch(`${baseUrl}${firstEdition.key}.json`);
    editionDetails = await editionResponse.json();
  }

  const book = {
    key: workData.key,
    book: {
      title: workData.title,
      subtitle: workData.subtitle || '',
      cover: firstEdition?.covers?.[0]
        ? `https://covers.openlibrary.org/b/id/${firstEdition.covers[0]}-L.jpg`
        : null,
      pages:
        editionDetails?.number_of_pages ||
        firstEdition?.number_of_pages ||
        null,
      description:
        typeof workData.description === 'object'
          ? workData.description.value
          : typeof workData.description === 'string'
            ? workData.description
            : '',
      publishDate:
        workData.first_publish_date || firstEdition?.publish_date || null,
    },
    author: {
      name: workData.authors?.[0]?.author?.key
        ? await getAuthorName(workData.authors[0].author.key)
        : 'Autor desconhecido',
    },
    rating: {
      average: ratingsData.summary?.average || 0,
      count: ratingsData.summary?.count || 0,
      readingLog: {
        currently_reading: workData.currently_reading_count || 0,
        want_to_read: workData.want_to_read_count || 0,
        already_read: workData.already_read_count || 0,
      },
    },
  };

  return book;
};

export const getAllBooks = async (
  searchQuery: string,
  page = 1,
  limit = 10,
): Promise<IBookListResponse> => {
  const baseUrl = 'https://openlibrary.org/search.json';
  const offset = (page - 1) * limit;

  const fields = [
    'key',
    'title',
    'author_name',
    'cover_i',
    'first_publish_year',
    'ratings_average',
    'ratings_count',
    'reading_log_count',
    'want_to_read_count',
    'currently_reading_count',
    'already_read_count',
  ].join(',');

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
    publishYear: book.first_publish_year,
    rating: {
      average: Number(book.ratings_average || 0).toFixed(2),
      count: book.ratings_count || 0,
      readingLog: {
        currently_reading: book.currently_reading_count || 0,
        want_to_read: book.want_to_read_count || 0,
        already_read: book.already_read_count || 0,
      },
    },
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
