import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SearchMovie from "../../../pages/SearchMovie";
import mockSearchMovieList from "../../mocks/searchMovieList.json";

describe("useMovieTitleSearch", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should fetch movies correctly", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ Search: mockSearchMovieList.data.slice(0, 10) }),
      } as Response)
    );

    render(<SearchMovie />);

    const input = screen.getByPlaceholderText("Search movie title");
    fireEvent.change(input, { target: { value: "Inception" } });
    fireEvent.submit(screen.getByText("Search"));

    await waitFor(() => {
      expect(screen.queryAllByTestId("movie-card")).toHaveLength(10);
    });
  });

  test("should fetch pagination movies correctly", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            Search: mockSearchMovieList.data.slice(0, 10),
            totalResults: 100,
          }),
      } as Response)
    );

    (global.fetch as jest.Mock).mockImplementationOnce((url) => {
      if (
        url.includes(
          "http://www.omdbapi.com/?apikey=66f2ccca&s=inception&page=2"
        )
      ) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              Search: mockSearchMovieList.data.slice(10, 20),
              totalResults: 100,
            }),
        } as Response);
      }
    });

    render(<SearchMovie />);

    const input = screen.getByPlaceholderText("Search movie title");
    fireEvent.change(input, { target: { value: "Inception" } });
    fireEvent.submit(screen.getByText("Search"));

    await waitFor(() => {
      expect(screen.queryAllByTestId("movie-card")).toHaveLength(10);
    });

    await waitFor(() => {
      expect(screen.getByTestId("next-page")).toBeInTheDocument();
    });

    const nextPageButton = screen.getByTestId("next-page");
    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://www.omdbapi.com/?apikey=66f2ccca&s=inception&page=2"
      );
    });

    await waitFor(() => {
      expect(screen.queryAllByTestId("movie-card")).toHaveLength(10);
    });

    await waitFor(() => {
      expect(screen.getByText("Happy Accidents")).toBeInTheDocument();
    });
  });

  describe("error handling", () => {
    test("should return error state if api fails", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce({} as Response);

      render(<SearchMovie />);

      const input = screen.getByPlaceholderText("Search movie title");
      fireEvent.change(input, { target: { value: "Inception" } });
      fireEvent.submit(screen.getByText("Search"));

      await waitFor(() => {
        expect(
          screen.getByText("Error fetching movies. Please try again later.")
        ).toBeInTheDocument();
      });
    });

    test("should show error state if api response includes error", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve({ Error: "Too many results." }),
      } as Response);

      render(<SearchMovie />);

      const input = screen.getByPlaceholderText("Search movie title");
      fireEvent.change(input, { target: { value: "Inception" } });
      fireEvent.submit(screen.getByText("Search"));

      await waitFor(() => {
        expect(
          screen.getByText(
            "Try refining your search with a more specific movie title."
          )
        ).toBeInTheDocument();
      });
    });
  });
});
