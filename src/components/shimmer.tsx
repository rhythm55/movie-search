import { FC } from "react";

import {
  ShimmerElementHeightInterface,
  ShimmerElementInterface,
} from "../interfaces/shimmerInterface";

/*
  ShimmerElement component renders a shimmer effect element with specified heights
  @param className: CSS classes for the element
  @param heights: Array of string heights for each shimmer line
  @param testId (optional): Test ID for the element
*/
const ShimmerElement: FC<ShimmerElementInterface> = ({
  testId,
  className,
  heights,
}) => (
  <div data-testid={testId} className={className}>
    {heights.map(({ key, height }: ShimmerElementHeightInterface) => (
      <p key={key} className={`h-${height} bg-gray-400 my-2`}></p>
    ))}
  </div>
);

/*
  CardShimmer component displays a shimmer effect for a movie card
*/
export const CardShimmer: FC = () => (
  <ShimmerElement
    testId="shimmer-element"
    className="card shadow-lg w-full md:w-80 p-2 animate-pulse"
    heights={[
      { key: "shimmer-1", height: "48" },
      { key: "shimmer-2", height: "5" },
      { key: "shimmer-3", height: "5" },
    ]}
  />
);

/*
  MovieCardDetailShimmer component displays a shimmer effect for the movie card detail view
*/
export const MovieCardDetailShimmer: FC = () => {
  return (
    <div
      data-testid="shimmer-element"
      className="grid grid-cols-1 md:grid-cols-3 p-4 animate-pulse items-center"
    >
      <ShimmerElement
        className="bg-gray-200 w-full md:w-52 md:gap-4 aspect-square"
        heights={[{ key: "shimmer-1", height: "h-full" }]}
      />
      <ShimmerElement
        className="col-span-2 md:mx-4"
        heights={[
          { key: "shimmer-2", height: "5" },
          { key: "shimmer-3", height: "5" },
          { key: "shimmer-4", height: "5" },
          { key: "shimmer-5", height: "5" },
          { key: "shimmer-6", height: "5" },
        ]}
      />
    </div>
  );
};
