import { render } from "@testing-library/react";
import MovieCardDetail from "../../../components/searchMovie/MovieCardDetail";
import useMovieDetail from "../../../hooks/useMovieDetail";

jest.mock("../../../hooks/useMovieDetail", () => jest.fn());

describe("MovieCardDetail component", () => {
  test("renders shimmer for loading state", () => {
    (useMovieDetail as jest.Mock).mockReturnValue(null);

    const { getByTestId } = render(<MovieCardDetail imdbID="tt123456" />);

    expect(getByTestId("shimmer-element")).toBeInTheDocument();
  });

  test("renders error state if movie details fetch fails", () => {
    (useMovieDetail as jest.Mock).mockReturnValue({
      error: "Movie not found!",
    });

    const { getByText } = render(<MovieCardDetail imdbID="tt123456" />);

    expect(getByText("Something went wrong.")).toBeInTheDocument();
  });

  test("renders movie details when data is available", () => {
    const movieDetails = {
      Title: "Inception",
      Poster: "poster-url.jpg",
      Plot: "A thief who steals corporate secrets through the use of dream-sharing technology...",
      Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
      Genre: "Action, Adventure, Sci-Fi",
      Director: "Christopher Nolan",
      Released: "16 Jul 2010",
    };
    (useMovieDetail as jest.Mock).mockReturnValue(movieDetails);

    const { getByText, getByAltText } = render(
      <MovieCardDetail imdbID="tt123456" />
    );

    expect(getByAltText("movie poster")).toBeInTheDocument();
    expect(
      getByText(
        "A thief who steals corporate secrets through the use of dream-sharing technology..."
      )
    ).toBeInTheDocument();
    expect(
      getByText("Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page")
    ).toBeInTheDocument();
    expect(getByText("Action, Adventure, Sci-Fi")).toBeInTheDocument();
    expect(getByText("Christopher Nolan")).toBeInTheDocument();
    expect(getByText("16 Jul 2010")).toBeInTheDocument();
  });

  describe("isFieldNotEmpty()", () => {
    test("should render non empty fields", () => {
      let movieDetails = {
        Genre: "Action, Adventure, Sci-Fi",
      };
      (useMovieDetail as jest.Mock).mockReturnValue(movieDetails);

      const { getByText } = render(<MovieCardDetail imdbID="tt123456" />);
      expect(getByText("Action, Adventure, Sci-Fi")).toBeInTheDocument();
    });

    test("should not render empty fields", () => {
      let movieDetails = {
        Genre: "N/A",
      };
      (useMovieDetail as jest.Mock).mockReturnValue(movieDetails);

      const { getByText } = render(<MovieCardDetail imdbID="tt123456" />);
      expect(() => getByText("Genre: N/A")).toThrow(
        "Unable to find an element"
      );
    });
  });
});
