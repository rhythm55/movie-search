import { FC } from "react";

export const EnterNewMovieState: FC = () => {
  return (
    <div
      data-testid="enter-new-movie-state"
      className="flex items-center justify-center mt-20 mx-12"
    >
      <div className="p-8 bg-white shadow-lg flex flex-col items-center justify-center">
        <p className="text-sm md:text-md text-gray-600">
          Start your movie search by entering a movie title above.
        </p>
      </div>
    </div>
  );
};
