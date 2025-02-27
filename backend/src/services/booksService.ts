export const getAllBooks = async () => {
  const response = await fetch(
    'https://openlibrary.org/search.json?q=the+lord+of+the+rings&&fields=key,title,author_name',
  );

  const books = await response.json();

  if (!response.ok) {
    throw new Error('Erro ao buscar livros');
  }

  return books;
};
