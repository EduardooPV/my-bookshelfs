export interface ISearchBooks {
  books: IBook[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface IBook {
  key: string;
  title: string;
  author: string;
  cover: string;
}
