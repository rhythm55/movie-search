import { render, screen } from "@testing-library/react";
import { SearchResultErrorState } from "../../../../components/state/searchMovieState/SearchResultErrorState";

describe("SearchResultErrorState component", () => {
  test("renders correctly with 'Movie not found!' error", () => {
    render(<SearchResultErrorState error="Movie not found!" />);
    expect(screen.getByText("No movies found.")).toBeInTheDocument();
  });

  test("renders correctly with 'Too many results.' error", () => {
    render(<SearchResultErrorState error="Too many results." />);
    expect(
      screen.getByText("Your search returned too many results.")
    ).toBeInTheDocument();
  });

  test("renders correctly with no error", () => {
    render(<SearchResultErrorState />);
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });
});
