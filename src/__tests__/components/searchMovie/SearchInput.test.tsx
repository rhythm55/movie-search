import { fireEvent, render, waitFor } from "@testing-library/react";
import SearchInput from "../../../components/searchMovie/SearchInput";
import useMovieTitleSearch from "../../../hooks/useMovieTitleSearch";

jest.mock("../../../hooks/useMovieTitleSearch");

describe("SearchInput component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useMovieTitleSearch as jest.Mock).mockReturnValue({
      fetchSearchedMovie: jest.fn(),
      resetSearch: jest.fn(),
    });
  });

  test("renders input field and search button", () => {
    const { getByPlaceholderText, getByText } = render(<SearchInput />);

    expect(getByPlaceholderText("Search movie title")).toBeInTheDocument();
    expect(getByText("Search")).toBeInTheDocument();
  });

  test("displays error message when no movie title is entered", async () => {
    const { getByText } = render(<SearchInput />);
    const searchButton = getByText("Search");

    fireEvent.click(searchButton);

    await waitFor(() =>
      expect(getByText("Please enter a movie title")).toBeInTheDocument()
    );
  });

  test("displays error message when non-alphabetic characters are entered", async () => {
    const { getByText, getByPlaceholderText } = render(<SearchInput />);
    const inputField = getByPlaceholderText("Search movie title");

    fireEvent.change(inputField, { target: { value: "12*&" } });
    fireEvent.click(getByText("Search"));

    await waitFor(() =>
      expect(
        getByText("Please enter only alphabets and numbers")
      ).toBeInTheDocument()
    );
  });

  test("clears input field and error message when clear button is clicked", async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <SearchInput />
    );

    const input = getByPlaceholderText("Search movie title");
    fireEvent.change(input, { target: { value: "Avatar" } });

    const clearButton = getByTestId("clear-search-input");
    fireEvent.click(clearButton);

    expect(input).toHaveValue("");
    expect(() => getByText("Please enter a movie title")).toThrow();
  });

  test("calls fetchSearchedMovie if search is valid", () => {
    const mockFetchSearchedMovie = jest.fn();
    (useMovieTitleSearch as jest.Mock).mockReturnValue({
      fetchSearchedMovie: mockFetchSearchedMovie,
      resetSearch: jest.fn(),
    });

    const { getByPlaceholderText, getByText } = render(<SearchInput />);

    const input = getByPlaceholderText("Search movie title");
    fireEvent.change(input, { target: { value: "Inception" } });
    fireEvent.submit(getByText("Search"));

    expect(mockFetchSearchedMovie).toHaveBeenCalledWith("inception");
  });
});
