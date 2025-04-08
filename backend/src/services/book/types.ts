export interface IBookAuthor {
  name: string;
}

export interface IBook {
  key: string;
  title: string;
  author: IBookAuthor;
  cover: string | null;
  description: string;
}

export interface IBookList {
  key: string;
  title: string;
  author: string;
  cover: string | null;
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
}

export type IBookListResponse = IPaginatedResponse<IBookList>;
