import { XCircleIcon } from "@heroicons/react/24/solid";
import { FC } from "react";

import { ModalInterface } from "../../interfaces/modalInterface";

/*
  Modal component that displays a modal overlay with a close button and content
  @param component: The content to display inside the modal
  @param closeModal: Function to close the modal
*/
const Modal: FC<ModalInterface> = ({ component, closeModal }) => {
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>): void => {
    // Close the modal if the click target is the overlay
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      data-testid="modal-overlay"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClickOutside}
      role="none"
    >
      <div className="fixed inset-x-5 inset-y-20 h-fit md:inset-x-56 md:inset-y-36 bg-white p-2 md:p-4 shadow-lg">
        <div className="flex justify-end w-full">
          <button data-testid="close-modal-button" onClick={closeModal}>
            <XCircleIcon className="size-6 text-yellow-300" />
          </button>
        </div>
        {component}
      </div>
    </div>
  );
};

export default Modal;
