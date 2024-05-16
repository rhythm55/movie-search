import { render, screen } from "@testing-library/react";
import { EnterNewMovieState } from "../../../../components/state/searchMovieState/EnterNewMovieState";

describe("EnterNewMovieState component", () => {
  test("renders correctly", () => {
    render(<EnterNewMovieState />);
    expect(screen.getByTestId("enter-new-movie-state")).toBeInTheDocument();
  });
});
