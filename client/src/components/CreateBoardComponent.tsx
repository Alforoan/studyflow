import React, { useEffect, useState } from "react";
import { Board } from "../types";
import { v4 as uuidv4 } from "uuid";
import { useBoard } from "../context/BoardContext";
import ErrorMessage from "./ErrorMessage";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CreateBoardComponentProps {
  handleCancel: () => void;
}

const emptyBoard: Board = {
  name: "",
  cards: [],
  uuid: "",
};

const CreateBoardComponent: React.FC<CreateBoardComponentProps> = ({
  handleCancel,
}) => {
  const [newBoard, setNewBoard] = useState<Board>(emptyBoard);
  const [error, setError] = useState<string | null>(null);
  const { handleAddNewBoard, userBoards } = useBoard();

  useEffect(() => {
    setNewBoard((prevBoard) => ({
      ...prevBoard,
      uuid: uuidv4(),
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBoard((prevBoard) => ({
      ...prevBoard,
      name: e.target.value,
    }));
    setError(null); // Clear error when user starts typing
  };

  const handleSubmit = () => {
    if (!newBoard.name.trim()) {
      setError("Please name your board.");
      return;
    }

    // Check if the board name already exists locally
    if (userBoards.some((board) => board.name === newBoard.name)) {
      setError("Board name already exists. Please choose another.");
      return;
    }

    try {
      handleAddNewBoard(newBoard);
      toast.success('Board created successfully!');
      handleCancel(); // Close the create board form
    } catch (err) {
      setError("Failed to create board. Please try again later.");
      toast.error('Failed to create board. Please try again.');
    }
  };

  return (
    <div className="flex flex-col mb-4">
      <div className="flex flex-row mb-4">
        <input
          className="p-2 border rounded mr-2 w-1/2"
          type="text"
          placeholder="Board Name"
          value={newBoard.name}
          onChange={handleChange}
          maxLength={30}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <button
          className="border rounded p-2 w-1/2 mr-2 bg-flair font-primary text-white px-4 py-2 hover:text-secondaryElements"
          onClick={() => handleSubmit()}
        >
          Create New Board
        </button>
        <button
          className="border rounded p-2 bg-warning hover:text-secondaryElements text-white"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
      <ErrorMessage message={error} />
    </div>
  );
};

export default CreateBoardComponent;