import React from "react";
import { render, screen } from "@testing-library/react";
import { CardShimmer, MovieCardDetailShimmer } from "../../components/shimmer";

describe("CardShimmer component", () => {
  test("renders card shimmer with correct structure", () => {
    render(<CardShimmer />);

    const cardShimmer = screen.getByTestId("shimmer-element");
    expect(cardShimmer).toBeInTheDocument();
    expect(Array.from(cardShimmer.children)).toHaveLength(3);
  });
});

describe("MovieCardDetailShimmer component", () => {
  test("renders movie card detail shimmer with correct structure", () => {
    render(<MovieCardDetailShimmer />);

    const movieCardDetailShimmer = screen.getByTestId("shimmer-element");
    expect(movieCardDetailShimmer).toBeInTheDocument();
    expect(Array.from(movieCardDetailShimmer.children)).toHaveLength(2);
  });
});
