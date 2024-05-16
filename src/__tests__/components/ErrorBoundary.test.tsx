import { render, screen } from "@testing-library/react";
import React, { ReactNode } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";

describe("ErrorBoundary", () => {
  const ErrorComponent = () => {
    throw new Error("Test error");
  };

  const MockComponent = ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  );

  test("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <MockComponent>
          <p>Content</p>
        </MockComponent>
      </ErrorBoundary>
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  test("renders error state when there is an error", () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });

  test("logs the error to the console", () => {
    const consoleSpy = jest.spyOn(console, "error");
    consoleSpy.mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
