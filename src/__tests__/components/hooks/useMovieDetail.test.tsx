import { renderHook, waitFor } from "@testing-library/react";
import useMovieDetail from "../../../hooks/useMovieDetail";

describe("useMovieDetail", () => {
  test("fetches movie details correctly", async () => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            Title: "Inception",
            Plot: "A thief who steals corporate secrets through the use of dream-sharing technology...",
            Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
            Genre: "Action, Adventure, Sci-Fi",
            Director: "Christopher Nolan",
            Released: "16 Jul 2010",
          }),
      } as Response)
    );
    const imdbID = "tt1375666";
    const { result } = renderHook(() => useMovieDetail(imdbID));
    await waitFor(() => {
      expect(result.current).toEqual({
        Title: "Inception",
        Plot: "A thief who steals corporate secrets through the use of dream-sharing technology...",
        Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
        Genre: "Action, Adventure, Sci-Fi",
        Director: "Christopher Nolan",
        Released: "16 Jul 2010",
      });
    });
  });

  test("handles error when fetching movie details", async () => {
    const imdbID = "tt1375666";
    jest
      .spyOn(global, "fetch")
      .mockRejectedValueOnce(new Error("Failed to fetch"));

    const { result } = renderHook(() => useMovieDetail(imdbID));

    expect(result.current).toBeNull();

    await waitFor(() => {
      const error = new Error("Failed to fetch");
      expect(result.current).toEqual({ error: error });
    });
  });
});
