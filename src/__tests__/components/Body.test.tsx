import React from "react";
import { render, screen } from "@testing-library/react";
import Body from "../../components/Body";

describe("Body component", () => {
  test("renders SearchMovie component", () => {
    render(<Body />);
    const bodyElement = screen.getByTestId("body");
    expect(bodyElement).toBeInTheDocument();

    const searchMovieElement = screen.getByTestId("search-input");
    expect(searchMovieElement).toBeInTheDocument();
  });
});
