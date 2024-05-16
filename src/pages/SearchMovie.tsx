import { createContext, FC, useMemo, useState } from "react";

import SearchInput from "../components/searchMovie/SearchInput";
import SearchResultMovieList from "../components/searchMovie/SearchResultMovieList";
import { EnterNewMovieState } from "../components/state/searchMovieState/EnterNewMovieState";
import { SearchMovieDataInterface } from "../interfaces/searchMovieInterface";

// Context for managing search movie data
export const SearchMovieContext = createContext<any>([]);

/*
  SearchMovie component manages the search movie functionality
  Renders SearchInput component for searching movies
  Displays search result if there is a search text 
  Displays EnterNewMovieState if there is no search text
*/
const SearchMovie: FC = () => {
  // State to manage search movie data
  const [searchMovieData, setSearchMovieData] =
    useState<SearchMovieDataInterface | null>({
      searchText: "",
      searchResultMovie: [],
      totalResults: 0,
      isLoading: false,
      error: "",
    });

  // Memoized context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({ searchMovieData, setSearchMovieData }),
    [searchMovieData, setSearchMovieData]
  );

  return (
    <SearchMovieContext.Provider value={contextValue}>
      <SearchInput />
      {searchMovieData?.searchText ? (
        <SearchResultMovieList />
      ) : (
        <EnterNewMovieState />
      )}
    </SearchMovieContext.Provider>
  );
};

export default SearchMovie;
