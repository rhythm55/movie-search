import { FC, useContext, useEffect, useState } from "react";

import useMovieTitleSearch from "../../hooks/useMovieTitleSearch";
import { SearchMovieContext } from "../../pages/SearchMovie";
import {
  PAGINATION_SET_LENGTH,
  SEARCH_RESULT_MOVIE_LIST_PAGE_LENGTH,
} from "../../utils/constant";
import { CardShimmer } from "../shimmer";
import MovieCard from "./MovieCard";
import Pagination from "../common/Pagination";
import { SearchResultErrorState } from "../state/searchMovieState/SearchResultErrorState";
import { generateArray } from "../../utils/commonUtils";
import {
  SearchMovieDataInterface,
  SearchResultMovieInterface,
} from "../../interfaces/searchMovieInterface";
import { PaginationDataInterface } from "../../interfaces/paginationInterface";

/*
  SearchResultMovieList component displays a list of search result movies
  and handles pagination for navigating through pages.
*/
const SearchResultMovieList: FC = () => {
  const { searchMovieData } = useContext<{
    searchMovieData: SearchMovieDataInterface;
  }>(SearchMovieContext);
  const [paginationData, setPaginationData] = useState<PaginationDataInterface>(
    {
      currentPage: 1,
      pageSetList: [],
    }
  );
  const { fetchSearchedMovie } = useMovieTitleSearch();

  // Reset pagination when search text changes
  useEffect(() => {
    setPaginationData({ currentPage: 1, pageSetList: [] });
  }, [searchMovieData.searchText]);

  const updatePaginationData = (
    paginationData: PaginationDataInterface
  ): void => {
    setPaginationData(paginationData);
    // fetch page data if not available in searchMovieData
    if (!searchMovieData.searchResultMovie[paginationData.currentPage]) {
      fetchSearchedMovie(
        searchMovieData.searchText,
        paginationData.currentPage
      );
    }
  };

  // Render shimmer loading state while data is loading
  if (searchMovieData.isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-2">
        {generateArray(SEARCH_RESULT_MOVIE_LIST_PAGE_LENGTH).map(
          (item: number) => (
            <CardShimmer key={item} />
          )
        )}
      </div>
    );
  }

  return (
    <>
      {searchMovieData?.error?.length > 0 ? (
        <SearchResultErrorState error={searchMovieData.error} />
      ) : (
        <>
          <div
            data-testid="search-result-movie-list"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 p-2"
          >
            {searchMovieData.searchResultMovie[paginationData.currentPage]?.map(
              (item: SearchResultMovieInterface) => (
                <MovieCard key={item.imdbID} {...item} />
              )
            )}
          </div>
          <Pagination
            setLength={PAGINATION_SET_LENGTH}
            pageLength={SEARCH_RESULT_MOVIE_LIST_PAGE_LENGTH}
            totalResults={searchMovieData.totalResults}
            paginationData={paginationData}
            setPaginationData={updatePaginationData}
          />
        </>
      )}
    </>
  );
};

export default SearchResultMovieList;
