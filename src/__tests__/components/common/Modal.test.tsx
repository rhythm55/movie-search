import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../../../components/common/Modal";

describe("Modal component", () => {
  test("renders modal content when loaded", () => {
    const closeModal = jest.fn();
    const component = <div>Modal content</div>;

    render(<Modal component={component} closeModal={closeModal} />);

    const modalContent = screen.getByText("Modal content");
    expect(modalContent).toBeInTheDocument();
  });

  test("closes modal when clicking outside modal content", () => {
    const closeModal = jest.fn();
    const component = <div>Modal content</div>;

    render(<Modal component={component} closeModal={closeModal} />);

    const modalOverlay = screen.getByTestId("modal-overlay");
    fireEvent.click(modalOverlay);

    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  test("does not close modal when clicking inside modal content", () => {
    const closeModal = jest.fn();
    const component = <div>Modal content</div>;

    render(<Modal component={component} closeModal={closeModal} />);

    const modalContent = screen.getByText("Modal content");
    fireEvent.click(modalContent);

    expect(closeModal).not.toHaveBeenCalled();
  });
});
