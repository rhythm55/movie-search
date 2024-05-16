import { render, screen } from "@testing-library/react";
import { PosterNotAvailableState } from "../../../../components/state/searchMovieState/PosterNotAvailableState";

describe("PosterNotAvailableState component", () => {
  test("renders correctly with given styleClass", () => {
    render(<PosterNotAvailableState styleClass="test-class" />);
    expect(screen.getByText("Poster Not Available")).toBeInTheDocument();
  });
});
