import { FC, memo, useState } from "react";

import Modal from "../common/Modal";
import MovieCardDetail from "./MovieCardDetail";
import { PosterNotAvailableState } from "../state/searchMovieState/PosterNotAvailableState";
import { SearchResultMovieInterface } from "../../interfaces/searchMovieInterface";

/*
  MovieCard component displays a movie card with movie details and a modal for detailed information
  @param imdbID: The IMDb ID of the movie
  @param Poster: The URL of the movie poster
  @param Title: The title of the movie
  @param Year: The release year of the movie
*/
const MovieCard: FC<SearchResultMovieInterface> = ({
  imdbID,
  Poster,
  Title,
  Year,
}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <>
      <button
        data-testid="movie-card"
        className="bg-white shadow-lg p-4"
        onClick={() => setIsOpenModal(true)}
      >
        {Poster === "N/A" || !Poster ? (
          <PosterNotAvailableState styleClass="bg-gray-200 w-full aspect-[3/2] flex justify-center items-center flex-col" />
        ) : (
          <img
            className="max-h-48 w-full aspect-[3/2]"
            src={Poster}
            alt="movie poster"
          />
        )}
        <div className="mt-2 text-left">
          <h3>
            <span className="text-sm text-gray-600">Movie Title:</span> {Title}
          </h3>
          <p>
            <span className="text-sm text-gray-600">Release Year:</span> {Year}
          </p>
        </div>
      </button>
      {isOpenModal && (
        <Modal
          closeModal={() => {
            setIsOpenModal(false);
          }}
          component={<MovieCardDetail imdbID={imdbID} />}
        />
      )}
    </>
  );
};

export default memo(MovieCard);
