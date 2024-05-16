import { render, RenderResult } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
  let getByTestId: RenderResult["getByTestId"];

  beforeEach(() => {
    ({ getByTestId } = render(<App />));
  });

  test("renders Header component", () => {
    const headerElement = getByTestId("header");
    expect(headerElement).toBeInTheDocument();
  });

  test("renders Body component", () => {
    const bodyElement = getByTestId("body");
    expect(bodyElement).toBeInTheDocument();
  });

  test("renders Footer component", () => {
    const footerElement = getByTestId("footer");
    expect(footerElement).toBeInTheDocument();
  });
});
