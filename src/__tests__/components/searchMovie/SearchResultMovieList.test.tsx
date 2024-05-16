import { render, screen, fireEvent } from "@testing-library/react";
import SearchResultMovieList from "../../../components/searchMovie/SearchResultMovieList";
import useMovieTitleSearch from "../../../hooks/useMovieTitleSearch";
import { SearchMovieContext } from "../../../pages/SearchMovie";
import { SEARCH_RESULT_MOVIE_LIST_PAGE_LENGTH } from "../../../utils/constant";
import mockSearchMovieList from "../../mocks/searchMovieList.json";

const mockContextValue = {
  searchMovieData: {
    isLoading: false,
    error: "",
    searchText: "Inception",
    totalResults: 100,
    searchResultMovie: {
      1: mockSearchMovieList.data.slice(0, 10),
    },
  },
};

jest.mock("../../../hooks/useMovieTitleSearch");

describe("SearchResultMovieList component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useMovieTitleSearch as jest.Mock).mockReturnValue({
      fetchSearchedMovie: jest.fn(),
      resetSearch: jest.fn(),
    });
  });

  test("renders loading state", () => {
    render(
      <SearchMovieContext.Provider
        value={{
          ...mockContextValue,
          searchMovieData: {
            ...mockContextValue.searchMovieData,
            isLoading: true,
          },
        }}
      >
        <SearchResultMovieList />
      </SearchMovieContext.Provider>
    );

    const shimmerElements = screen.getAllByTestId("shimmer-element");
    expect(shimmerElements.length).toBe(SEARCH_RESULT_MOVIE_LIST_PAGE_LENGTH);
  });

  test("renders error state", () => {
    const error = "Too many results.";
    render(
      <SearchMovieContext.Provider
        value={{
          ...mockContextValue,
          searchMovieData: { ...mockContextValue.searchMovieData, error },
        }}
      >
        <SearchResultMovieList />
      </SearchMovieContext.Provider>
    );

    const errorMessage = screen.getByText(
      "Your search returned too many results."
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("renders movie cards", () => {
    render(
      <SearchMovieContext.Provider value={{ ...mockContextValue }}>
        <SearchResultMovieList />
      </SearchMovieContext.Provider>
    );

    const movieCards = screen.getAllByRole("img", { name: "movie poster" });
    expect(movieCards.length).toBe(10);
  });

  test("calls fetchSearchedMovie with correct parameters when pagination is changed", () => {
    const fetchSearchedMovie = jest.fn();
    (useMovieTitleSearch as jest.Mock).mockReturnValue({ fetchSearchedMovie });

    render(
      <SearchMovieContext.Provider value={{ ...mockContextValue }}>
        <SearchResultMovieList />
      </SearchMovieContext.Provider>
    );

    const nextPageButton = screen.getByTestId("next-page");
    fireEvent.click(nextPageButton);

    expect(fetchSearchedMovie).toHaveBeenCalledWith("Inception", 2);
  });
});
