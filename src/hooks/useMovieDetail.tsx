import { useState, useEffect } from "react";

import { MovieDetailsInterface } from "../interfaces/searchMovieInterface";
import { OMBD_API_URL } from "../utils/constant";

/*
  Custom hook useMovieDetail fetches movie details from the OMDb API based on the IMDb ID
  @param imdbID: IMDb ID of the movie to fetch details for
  @returns MovieDetailsInterface object or an object with an error message
*/
const useMovieDetail = (
  imdbID: string
): MovieDetailsInterface | { error: string } | null => {
  const [movie, setMovie] = useState<
    MovieDetailsInterface | { error: string } | null
  >(null);

  useEffect(() => {
    const fetchMovieByImdbId = async () => {
      try {
        const response = await fetch(`${OMBD_API_URL}&i=${imdbID}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setMovie({ error: error as string });
      }
    };

    fetchMovieByImdbId();
  }, [imdbID]);
  return movie;
};

export default useMovieDetail;
