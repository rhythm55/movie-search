import {
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FC, memo, useState } from "react";

import useMovieTitleSearch from "../../hooks/useMovieTitleSearch";

/*
  SearchInput component provides a search input field to search for movie titles
  and displays an error message if the search input is invalid.
*/
const SearchInput: FC = () => {
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { fetchSearchedMovie, resetSearch } = useMovieTitleSearch();

  const handleSearch = (): void => {
    resetSearch();
    const searchTextTrimmed: string = searchText.trim().toLowerCase();
    if (validateSearchText(searchTextTrimmed)) {
      fetchSearchedMovie(searchTextTrimmed);
      setErrorMessage("");
    }
  };

  const validateSearchText = (searchText: string): boolean => {
    if (searchText === "") {
      setErrorMessage("Please enter a movie title");
      setSearchText("");
      return false;
    }
    if (!/^[a-zA-Z0-9 ]*$/.test(searchText)) {
      setErrorMessage("Please enter only alphabets and numbers");
      setSearchText("");
      return false;
    }

    return true;
  };

  const handleSearchInputChange = (searchInputValue: string): void => {
    setSearchText(searchInputValue);
    setErrorMessage("");
  };

  const handleSearchInputClear = (): void => {
    setSearchText("");
    setErrorMessage("");
    resetSearch();
  };

  return (
    <form
      data-testid="search-input"
      className="flex justify-center mb-3"
      onSubmit={(e) => {
        handleSearch();
        e.preventDefault();
      }}
    >
      <div className="relative sm:w-10/12 md:w-3/12">
        <input
          className="w-full text-sm border border-black p-1"
          type="text"
          placeholder="Search movie title"
          value={searchText}
          onChange={(e) => handleSearchInputChange(e.target.value)}
        />
        {errorMessage && (
          <div className="absolute flex items-center top-full text-red-500 text-sm">
            <ExclamationCircleIcon className="size-4 mr-1" />
            <p>{errorMessage}</p>
          </div>
        )}
      </div>

      {searchText?.length > 0 && (
        <button
          data-testid="clear-search-input"
          type="button"
          className="btn-transparent flex border-black border-y border-r items-center justify-center py-1 mr-2 p-2 bg-white hover:bg-black hover:text-white"
          onClick={() => handleSearchInputClear()}
        >
          <XMarkIcon className="size-4" />
        </button>
      )}

      <button
        type="submit"
        className="flex ml-2 items-center bg-white border border-black px-2 py-1 text-xs hover:bg-black hover:text-white"
      >
        Search <MagnifyingGlassIcon className="size-4 ml-1" />
      </button>
    </form>
  );
};

export default memo(SearchInput);
