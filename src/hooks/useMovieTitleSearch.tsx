import { useContext } from "react";

import { SearchMovieDataInterface } from "../interfaces/searchMovieInterface";
import { SearchMovieContext } from "../pages/SearchMovie";
import { OMBD_API_URL } from "../utils/constant";

/*
  Custom hook useMovieTitleSearch handles searching for movies based on a search text and pagination
  @returns Object with functions for fetching searched movies and resetting search state
*/
const useMovieTitleSearch = () => {
  const { setSearchMovieData } = useContext(SearchMovieContext);
  /*
    fetchSearchedMovie function fetches movies from the OMDB API based on a search text and page number
    @param searchText: The text to search for movies
    @param page: The page number of the search results
  */
  const fetchSearchedMovie = async (searchText: string, page = 1) => {
    // set is loading true so that appropriate state can be shown
    setSearchMovieData((prev: SearchMovieDataInterface) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      const response = await fetch(
        `${OMBD_API_URL}&s=${searchText}&page=${page}`
      );
      const data = await response.json();

      setSearchMovieData((prev: SearchMovieDataInterface) => {
        if (data.Error) {
          // API returns Error in response
          return {
            searchText,
            searchResultMovie: [],
            totalResults: 0,
            isLoading: false,
            error: data.Error,
          };
        } else if (prev.searchText === searchText) {
          // Same search text paginated data
          return {
            ...prev,
            searchResultMovie: {
              ...prev.searchResultMovie,
              [page]: data.Search,
            },
            isLoading: false,
          };
        } else {
          // new search text data
          return {
            ...prev,
            searchText,
            searchResultMovie: { [page]: data.Search },
            totalResults: data.totalResults,
            isLoading: false,
          };
        }
      });
    } catch (error) {
      console.error("Error fetching movies:", error);
      setSearchMovieData(() => ({
        searchText,
        isLoading: false,
        error: "Error fetching movies. Please try again later.",
      }));
    }
  };

  /*
    resetSearch function resets the searchMovieData to its initial state, clearing the search text and results
  */
  const resetSearch = (): void => {
    setSearchMovieData(() => {
      return {
        searchText: "",
        searchResultMovie: [],
        totalResults: 0,
        isLoading: false,
      };
    });
  };

  return { fetchSearchedMovie, resetSearch };
};

export default useMovieTitleSearch;
