import { FC } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

import { ErrorStateInterface } from "../../interfaces/errorStateInterface";

export const ErrorState: FC<ErrorStateInterface> = ({ error, icon }) => {
  const errorMessage: string[] = error ?? [
    "Something went wrong.",
    "Please try again later.",
  ];

  return (
    <div className="flex mt-8 justify-center h-full">
      <div className="p-8 bg-white shadow-lg flex flex-col items-center justify-center min-w-64 md:min-w-96 m-4">
        <div className="flex items-center justify-center h-24 w-24 rounded-full bg-gray-200 mb-4">
          {icon ?? <ExclamationCircleIcon className="size-20 text-gray-400" />}
        </div>
        <p className="text-lg md:text-xl text-gray-600">Oops!</p>
        {errorMessage.map((message: string) => (
          <p key={message} className="text-sm md:text-md text-gray-600">
            {message}
          </p>
        ))}
      </div>
    </div>
  );
};
