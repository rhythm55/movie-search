export interface PaginationInterface {
  setLength: number;
  pageLength: number;
  totalResults: number;
  paginationData: PaginationDataInterface;
  setPaginationData: (paginationData: PaginationDataInterface) => void;
}

export interface PaginationDataInterface {
  currentPage: number;
  pageSetList: number[];
}
