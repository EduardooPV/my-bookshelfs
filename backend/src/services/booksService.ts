export const getBook = async (id: string) => {
  const baseUrl = 'https://openlibrary.org/';
  const query = 'the lord of the rings';
  const fields = [
    'key',
    'title',
    'author_name',
    'cover_edition_key',
    'number_of_pages_median',
    'ratings_average',
    'first_publish_year',
  ].join(',');

  const response = await fetch(
    `${baseUrl}/${id}?q=${encodeURIComponent(query)}&fields=${fields}`,
  );

  const books = await response.json();

  if (!response.ok) {
    throw new Error('Erro ao buscar livros');
  }

  return books;
};

export const getAllBooks = async () => {
  const baseUrl = 'https://openlibrary.org/search.json';
  const query = 'the lord of the rings';
  const fields = [
    'key',
    'title',
    'author_name',
    'cover_edition_key',
    'first_publish_year',
    'ratings_average',
    'readinglog_count',
    'want_to_read_count',
    'currently_reading_count',
    'already_read_count',
    'first_publish_year',
  ].join(',');

  const response = await fetch(
    `${baseUrl}?q=${encodeURIComponent(query)}&fields=${fields}`,
  );

  const books = await response.json();

  if (!response.ok) {
    throw new Error('Erro ao buscar livros');
  }

  return books;
};
