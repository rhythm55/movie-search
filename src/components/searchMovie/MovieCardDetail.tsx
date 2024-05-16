import { FC, memo, useEffect, useState } from "react";

import useMovieDetail from "../../hooks/useMovieDetail";
import { MovieCardDetailShimmer } from "../shimmer";
import { SearchResultErrorState } from "../state/searchMovieState/SearchResultErrorState";
import { PosterNotAvailableState } from "../state/searchMovieState/PosterNotAvailableState";
import { MovieDetailsInterface } from "../../interfaces/searchMovieInterface";

/*
  MovieCardDetail component displays detailed information about a movie
  @param imdbID: The IMDb ID of the movie to fetch details for
*/
const MovieCardDetail: FC<{ imdbID: string }> = ({ imdbID }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<
    MovieDetailsInterface | { error: string } | null
  >(null);
  const movieData: MovieDetailsInterface | { error: string } | null =
    useMovieDetail(imdbID);

  useEffect(() => {
    if (movieData) {
      setData(movieData);
      setIsLoading(false);
    }
  }, [movieData]);

  // Display error state if movie data contains an error
  if (data && ("error" in data || data.Error)) {
    return <SearchResultErrorState />;
  }

  // Function to check if a field in movie data is not empty
  const isFieldNotEmpty = (field: keyof MovieDetailsInterface): boolean =>
    data?.[field] !== "N/A";

  return (
    <>
      {isLoading ? (
        <MovieCardDetailShimmer />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 p-2 md:p-4 md:gap-4 items-center">
          {isFieldNotEmpty("Poster") ? (
            <img
              className="w-full md:w-52 aspect-square"
              src={data?.Poster ?? ""}
              alt="movie poster"
            />
          ) : (
            <PosterNotAvailableState styleClass="bg-gray-200 w-full md:w-52 aspect-square flex justify-center items-center flex-col" />
          )}

          <div className="col-span-2 text-xs md:text-sm mt-2 md:mt-0">
            {data && isFieldNotEmpty("Plot") && (
              <p className="my-2">
                <span className="text-sm text-gray-600">Plot: </span>
                {data?.Plot}
              </p>
            )}
            {data && isFieldNotEmpty("Actors") && (
              <p>
                <span className="text-sm text-gray-600">Actors: </span>
                {data?.Actors}
              </p>
            )}
            {data && isFieldNotEmpty("Genre") && (
              <p>
                <span className="text-sm text-gray-600">Genre: </span>
                {data?.Genre}
              </p>
            )}
            {data && isFieldNotEmpty("Director") && (
              <p>
                <span className="text-sm text-gray-600">Director: </span>
                {data?.Director}
              </p>
            )}
            {data && isFieldNotEmpty("Released") && (
              <p>
                <span className="text-sm text-gray-600">Released: </span>
                {data?.Released}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default memo(MovieCardDetail);
