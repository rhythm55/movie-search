import { render, screen } from "@testing-library/react";
import Header from "../../components/Header";

describe("Header component", () => {
  test("renders header with correct content", () => {
    render(<Header />);

    const headerElement = screen.getByTestId("header");
    expect(headerElement).toBeInTheDocument();

    const text = screen.getByText("Movie Search");
    expect(text).toBeInTheDocument();
  });
});
