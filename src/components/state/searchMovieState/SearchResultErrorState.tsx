import { FC, ReactNode } from "react";
import { FilmIcon } from "@heroicons/react/24/solid";

import { ErrorState } from "../ErrorState";

export const SearchResultErrorState: FC<{ error?: string }> = ({ error }) => {
  let errorMessage: string[] = [];
  let icon: ReactNode;
  if (error) {
    switch (error) {
      case "Too many results.":
        errorMessage = [
          "Your search returned too many results.",
          "Try refining your search with a more specific movie title.",
        ];

        break;
      case "Movie not found!":
        errorMessage = ["No movies found.", "Please try another movie title."];
        icon = <FilmIcon className="size-20 text-gray-400" />;
        break;
      default:
        errorMessage = [error];
    }
    return <ErrorState error={errorMessage} icon={icon} />;
  }

  return <ErrorState />;
};
