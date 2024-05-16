import { FC } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";

export const PosterNotAvailableState: FC<{ styleClass: string }> = ({
  styleClass,
}) => {
  return (
    <div className={styleClass}>
      <PhotoIcon className="size-16 text-gray-500" />
      <p className="text-gray-500 text-sm md:text-md">Poster Not Available</p>
    </div>
  );
};
