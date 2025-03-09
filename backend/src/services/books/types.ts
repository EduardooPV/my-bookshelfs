export interface IBookRating {
  average: number;
  count: number;
  readingLog: {
    currently_reading: number;
    want_to_read: number;
    already_read: number;
  };
}

export interface IBookAuthor {
  name: string;
}

export interface IBookDetails {
  title: string;
  subtitle?: string;
  cover: string | null;
  pages: number | null;
  description: string;
  publishDate: string | null;
}

export interface IBook {
  key: string;
  book: IBookDetails;
  author: IBookAuthor;
  rating: IBookRating;
}

export interface IBookList {
  key: string;
  title: string;
  author: string;
  cover: string | null;
  publishYear: number | null;
  rating: IBookRating;
}

export interface IPaginatedResponse<T> {
  books: T[];
  total: number;
  page: number;
  totalPages: number;
}

export interface IOpenLibraryBook {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  ratings_average?: number;
  ratings_count?: number;
  currently_reading_count?: number;
  want_to_read_count?: number;
  already_read_count?: number;
}

export type IBookListResponse = IPaginatedResponse<IBookList>;
