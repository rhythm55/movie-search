import { render, screen } from "@testing-library/react";
import { ErrorState } from "../../../components/state/ErrorState";

describe("ErrorState component", () => {
  test("renders correctly with custom error message and icon", () => {
    render(
      <ErrorState
        error={["Custom error message"]}
        icon={<div>Custom icon</div>}
      />
    );
    expect(screen.getByText("Custom error message")).toBeInTheDocument();
    expect(screen.getByText("Custom icon")).toBeInTheDocument();
  });

  test("renders correctly with default error message and icon", () => {
    render(<ErrorState />);
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    expect(screen.getByText("Please try again later.")).toBeInTheDocument();
  });
});
