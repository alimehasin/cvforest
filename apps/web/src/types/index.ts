export type TranslationFn = (v: string) => string;

export interface Pagination {
  page: number;
  pageSize: number;
}

export interface Sorting {
  sortingColumn: string;
  sortingDirection: 'asc' | 'desc';
}
