import React, { useContext, useEffect, useRef } from "react";
import { DeleteBoardContext } from "../context/DeleteBoardContext";
import { useTemplates } from "../context/TemplateContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (uuid?: string) => void;
  message: string;
  type: "board" | "card" | "template" | null;
  id?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  message,
  onDelete,
  type,
  id,
}) => {
  const { setModalOpen, handleDeleteBoard, handleDeleteTemplate } =
    useContext(DeleteBoardContext);

  const { isTemplate } = useTemplates();
  if (!isOpen) return null;

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus(); // Focus on the modal when it opens
    }
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      onClose(); // Close modal on Escape key
    }
  };

  const handleDelete = () => {
    if (type === "board") {
      if (isTemplate) {
        handleDeleteTemplate();
      } else {
        handleDeleteBoard();
      }
    } else {
      onDelete(id);
    }
    setModalOpen(false);
    onClose();
  };

  return isOpen ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-describedby="modalDescription"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={modalRef}
        className="relative w-auto max-w-sm mx-auto my-6 bg-white rounded-lg shadow-lg"
      >
        <div
          id="modalTitle"
          className="flex items-start justify-between p-5 border-b border-gray-200 rounded-t"
        >
          <h3 className="text-lg font-semibold">Confirm Delete</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close Modal"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div id="modalDescription" className="p-5">
          <p className="text-sm text-gray-700">{message}</p>
        </div>
        <div className="flex items-center justify-end px-5 py-4 bg-gray-100 border-t border-gray-200 rounded-b">
          <button
            className="px-4 py-2 mr-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
            aria-label="Delete"
            onClick={() => {
              handleDelete();
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              setModalOpen(false);
              onClose();
            }}
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
            aria-label="Cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
