import { fireEvent, render, screen } from "@testing-library/react";
import MovieCard from "../../../components/searchMovie/MovieCard";

const mockSearchResultMovie = {
  imdbID: "tt123456",
  Poster: "poster-url.jpg",
  Title: "Inception",
  Year: "2010",
};

describe("MovieCard component", () => {
  test("renders movie card correctly with poster available", () => {
    const { getByAltText, getByText } = render(
      <MovieCard {...mockSearchResultMovie} />
    );

    expect(getByAltText("movie poster")).toBeInTheDocument();
    expect(getByText("Inception")).toBeInTheDocument();
    expect(getByText("2010")).toBeInTheDocument();
  });

  test("renders movie card correctly with poster not available", () => {
    const { getByText } = render(
      <MovieCard {...mockSearchResultMovie} Poster="N/A" />
    );

    expect(getByText("Poster Not Available")).toBeInTheDocument();
    expect(getByText("Inception")).toBeInTheDocument();
    expect(getByText("2010")).toBeInTheDocument();
  });

  test("opens modal when clicked", () => {
    const { getByAltText } = render(<MovieCard {...mockSearchResultMovie} />);
    fireEvent.click(getByAltText("movie poster"));

    expect(screen.getByTestId("modal-overlay")).toBeInTheDocument();
  });

  test("closes modal when modal close button is clicked", () => {
    const { getByAltText, queryByTestId } = render(
      <MovieCard {...mockSearchResultMovie} />
    );
    fireEvent.click(getByAltText("movie poster"));
    expect(screen.getByTestId("modal-overlay")).toBeInTheDocument();

    const closeButton = screen.getByTestId("close-modal-button");
    fireEvent.click(closeButton);

    expect(queryByTestId("modal-overlay")).not.toBeInTheDocument();
  });
});
