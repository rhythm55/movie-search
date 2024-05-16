import { FC } from "react";

const Footer: FC = () => {
  return (
    <div
      data-testid="footer"
      className="w-full fixed bottom-0 drop-shadow bg-neutral-800 text-white text-center"
    >
      <p className="text-xs leading-6 md:mb-2 w-full flex items-center justify-center">
        © 2024 Movie Search, all rights reserved.
      </p>
    </div>
  );
};

export default Footer;
