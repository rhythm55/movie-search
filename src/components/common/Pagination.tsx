import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { FC, memo, useEffect, useMemo } from "react";

import { PaginationInterface } from "../../interfaces/paginationInterface";
import { generateArray } from "../../utils/commonUtils";

/*
  Pagination component that handles pagination logic for previous/next and previousSet/nextSet buttons
  @param setLength: Number of pages to display in the pagination set
  @param pageLength: Number of items per page
  @param totalResults: Total number of results to paginate
  @param paginationData: Object containing current page and page set list
  @param setPaginationData: Function to update paginationData
*/
const Pagination: FC<PaginationInterface> = ({
  setLength,
  pageLength,
  totalResults,
  paginationData,
  setPaginationData,
}) => {
  // Calculate the total number of pages
  const lastPage: number = useMemo(
    () => Math.ceil(totalResults / pageLength),
    [totalResults, pageLength]
  );

  useEffect(() => {
    // Initialize paginationData
    if (
      paginationData.currentPage === 1 &&
      paginationData.pageSetList.length === 0
    ) {
      // Calculate the number of pages for the initial page set
      let dataSetLength: number =
        totalResults / (setLength * pageLength) >= 1 ? setLength : lastPage;

      // Create a new page set list
      const newPageSetList: number[] = generateArray(dataSetLength);
      setPaginationData({
        currentPage: paginationData.currentPage,
        pageSetList: newPageSetList,
      });
    }
  }, [paginationData.currentPage, paginationData.pageSetList]);

  // Function to handle moving to the next page
  const handleNextPage = (): void => {
    if (paginationData.currentPage !== lastPage) {
      const newCurrentPage: number = paginationData.currentPage + 1;
      handlePageChange(newCurrentPage);
      if (newCurrentPage > paginationData.pageSetList[setLength - 1]) {
        handlePageSetChange(true);
      }
    }
  };

  // Function to handle moving to the previous page
  const handlePreviousPage = (): void => {
    const newCurrentPage: number = paginationData.currentPage - 1;
    handlePageChange(newCurrentPage);
    if (newCurrentPage < paginationData.pageSetList[0]) {
      handlePageSetChange(false, newCurrentPage);
    }
  };

  // Function to handle changing the current page
  const handlePageChange = (pageNumber: number): void => {
    setPaginationData({
      currentPage: pageNumber,
      pageSetList: paginationData.pageSetList,
    });
  };

  // Function to handle page set change
  const handlePageSetChange = (
    isNext: boolean,
    nextCurrentPage?: number
  ): void => {
    let startNumber: number;
    if (isNext) {
      // If moving to the next set, calculate the starting page number for the new set
      // Ensure that there are enough pages for a full set
      startNumber = Math.min(
        paginationData.pageSetList[setLength - 1] + 1,
        lastPage - setLength + 1
      );
    } else {
      startNumber = Math.max(paginationData.pageSetList[0] - setLength, 1);
    }

    const newPageSetList: number[] = generateArray(setLength, startNumber);

    const newCurrentPage: number = nextCurrentPage ?? startNumber;
    setPaginationData({
      currentPage: newCurrentPage,
      pageSetList: newPageSetList,
    });
  };

  return (
    <>
      {paginationData.pageSetList.length > 0 && (
        <div
          data-testid="pagination"
          className="pagination pagination flex justify-center mt-4"
        >
          {paginationData.pageSetList.length === setLength && (
            <button
              data-testid="previous-page-set-list"
              type="button"
              disabled={paginationData.pageSetList[0] === 1}
              onClick={() => handlePageSetChange(false)}
              className={`focus:outline-none ${
                paginationData.pageSetList[0] === 1
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              } `}
            >
              <ChevronDoubleLeftIcon className="size-6 text-black-600 p-1 m-1 bg-white shadow-sm hover:bg-black hover:text-white" />
            </button>
          )}

          <button
            data-testid="previous-page"
            type="button"
            disabled={paginationData.currentPage === 1}
            onClick={handlePreviousPage}
            className={`focus:outline-none ${
              paginationData.currentPage === 1
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            } `}
          >
            <ChevronLeftIcon className="size-6 text-black-600 p-1 m-1 bg-white shadow-sm hover:bg-black hover:text-white" />
          </button>

          {paginationData.pageSetList.map((pageNumber) => (
            <button
              data-testid="page-number"
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`${
                paginationData.currentPage === pageNumber ? "bg-yellow-300" : ""
              } w-8 inline-flex items-center justify-center rounded-full m-1 shadow-md bg-white hover:bg-black hover:text-white`}
            >
              {pageNumber}
            </button>
          ))}

          <button
            data-testid="next-page"
            type="button"
            disabled={paginationData.currentPage === lastPage}
            onClick={handleNextPage}
            className={`focus:outline-none ${
              paginationData.currentPage === lastPage
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            } `}
          >
            <ChevronRightIcon className="size-6 text-black-600 p-1 m-1 bg-white shadow-sm hover:bg-black hover:text-white" />
          </button>

          {paginationData.pageSetList.length === setLength && (
            <button
              data-testid="next-page-set-list"
              type="button"
              disabled={paginationData.pageSetList[setLength - 1] === lastPage}
              onClick={() => handlePageSetChange(true)}
              className={`focus:outline-none ${
                paginationData.pageSetList[setLength - 1] === lastPage
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              } `}
            >
              <ChevronDoubleRightIcon className="size-6 text-black-600 p-1 m-1 bg-white shadow-sm hover:bg-black hover:text-white" />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default memo(Pagination);
