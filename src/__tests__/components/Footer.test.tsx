import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer";

describe("Footer component", () => {
  test("renders footer with correct content", () => {
    render(<Footer />);

    const footerElement = screen.getByTestId("footer");
    expect(footerElement).toBeInTheDocument();

    const text = screen.getByText(/© 2024 Movie Search, all rights reserved/i);
    expect(text).toBeInTheDocument();
  });
});
