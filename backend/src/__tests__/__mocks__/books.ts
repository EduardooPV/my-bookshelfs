export const mockSearchResponse = {
  numFound: 2,
  docs: [
    {
      key: '/works/OL1234W',
      title: 'Test Book 1',
      author_name: ['Author 1'],
      cover_i: 12345,
      first_publish_year: 2020,
      ratings_average: 4.5,
      ratings_count: 100,
      currently_reading_count: 10,
      want_to_read_count: 20,
      already_read_count: 30,
    },
    {
      key: '/works/OL5678W',
      title: 'Test Book 2',
      author_name: ['Author 2'],
      cover_i: 67890,
      first_publish_year: 2021,
      ratings_average: 4.0,
      ratings_count: 200,
      currently_reading_count: 15,
      want_to_read_count: 25,
      already_read_count: 35,
    },
  ],
};

export const mockBookDetails = {
  workData: {
    key: '/works/OL1234W',
    title: 'Test Book',
    subtitle: 'A Test Subtitle',
    description: 'Test description',
    authors: [{ author: { key: '/authors/OL123A' } }],
    first_publish_date: '2020',
    currently_reading_count: 10,
    want_to_read_count: 20,
    already_read_count: 30,
  },
  ratingsData: {
    summary: {
      average: 4.5,
      count: 100,
    },
  },
  editionsData: {
    entries: [
      {
        key: '/books/OL1M',
        covers: [12345],
        number_of_pages: 200,
      },
    ],
  },
  editionDetails: {
    key: '/books/OL1M',
    number_of_pages: 200,
    isbn_10: ['1234567890'],
    isbn_13: ['9781234567890'],
    publish_date: '2020',
  },
  authorData: {
    name: 'Test Author',
  },
};

export const mockFormattedBookResponse = {
  key: '/works/OL1234W',
  book: {
    title: 'Test Book',
    subtitle: 'A Test Subtitle',
    cover: 'https://covers.openlibrary.org/b/id/12345-L.jpg',
    pages: 200,
    description: 'Test description',
    publishDate: '2020',
  },
  author: {
    name: 'Test Author',
  },
  rating: {
    average: 4.5,
    count: 100,
    readingLog: {
      currently_reading: 10,
      want_to_read: 20,
      already_read: 30,
    },
  },
};
