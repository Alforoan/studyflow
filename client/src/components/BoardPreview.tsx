import React, { useContext } from "react";
import { Board } from "../types";
import { DeleteBoardContext } from "../context/DeleteBoardContext";

interface BoardPreviewProps {
  board: Board;
  handleSelectBoard: (board: Board | null) => void;
}

const BoardPreview: React.FC<BoardPreviewProps> = ({
  board,
  handleSelectBoard,
}) => {
  // should show progress bar on this preview

  const { deleteBoardModal, setModalOpen } = useContext(DeleteBoardContext);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen(true);
    deleteBoardModal(board.uuid);
  };

  return (
    <div
      onClick={() => handleSelectBoard(board)}
      className="bg-secondaryElements border border-secondaryElements-200 p-4 shadow-sm w-40 h-40 flex-col items-center justify-center rounded relative"
    >
      <h1 className="text-center text-primaryText text-lg font-medium pb-8">
        {board.name}
      </h1>
      <div onClick={handleClick} className="absolute top-0 right-0 p-1">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
      <p>Total cards: {board.cards!.length - 1}</p>
    </div>
  );
};

export default BoardPreview;
