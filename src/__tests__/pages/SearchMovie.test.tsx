import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import movieList from "../mocks/searchMovieList.json";
import SearchMovie from "../../pages/SearchMovie";

describe("SearchMovie component", () => {
  test("renders SearchInput and EnterNewMovieState when searchText is empty", () => {
    render(<SearchMovie />);
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.queryByTestId("enter-new-movie-state")).toBeInTheDocument();
  });

  test("renders SearchResultMovieList when searchText is not empty", () => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ Search: movieList.data }),
      } as Response)
    );

    render(<SearchMovie />);

    const input = screen.getByPlaceholderText("Search movie title");
    fireEvent.change(input, { target: { value: "Inception" } });
    fireEvent.submit(screen.getByText("Search"));

    waitFor(() => {
      expect(
        screen.queryByTestId("enter-new-movie-state")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("search-result-movie-list")
      ).toBeInTheDocument();
    });
  });
});
