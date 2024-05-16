import { FC } from "react";
import SearchMovie from "../pages/SearchMovie";

const Body: FC = () => {
  return (
    <div data-testid="body" className="w-full absolute top-12 pb-12">
      <SearchMovie />
    </div>
  );
};

export default Body;
