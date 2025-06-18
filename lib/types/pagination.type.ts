export type FilterProps = {
  page: number;
  setPage: (p: number) => void;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  isLoading: boolean;
  refetch?: () => void;
  searchText?: string;
  setSearchText?: (text: string) => void;
};
