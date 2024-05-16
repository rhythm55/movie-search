import { FC } from "react";
import { FilmIcon } from "@heroicons/react/24/solid";

const Header: FC = () => {
  return (
    <nav
      data-testid="header"
      className="w-full fixed top-0 p-1 drop-shadow bg-white z-10"
    >
      <div className="mx-4 flex justify-center">
        <FilmIcon className="size-6 text-yellow-300 mr-2" />
        Movie Search
        <FilmIcon className="size-6 text-yellow-300 ml-2" />
      </div>
    </nav>
  );
};

export default Header;
