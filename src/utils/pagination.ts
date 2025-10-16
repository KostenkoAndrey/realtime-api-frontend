export interface PaginationResult<T> {
  currentItems: T[];
  totalPages: number;
  startIndex: number;
  endIndex: number;
}

export const pagination = <T>(items: T[], currentPage: number, itemsPerPage: number): PaginationResult<T> => {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  return {
    currentItems,
    totalPages,
    startIndex,
    endIndex,
  };
};
