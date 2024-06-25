import React, { useEffect, useState } from "react";
import { Board } from "../types";
import { v4 as uuidv4 } from "uuid";

interface CreateBoardComponentProps {
  handleAddNewBoard: (newBoard: Board) => void;
  handleCancel: () => void;
}

const emptyBoard: Board = {
  name: "",
  cards: [],
  uuid: "",
};

const CreateBoardComponent: React.FC<CreateBoardComponentProps> = ({
  handleAddNewBoard,
  handleCancel,
}) => {
  const [newBoard, setNewBoard] = useState<Board>(emptyBoard);
  const [error, setError] = useState<string | null>(null);

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

    try {
      handleAddNewBoard(newBoard);
    } catch (err) {
      setError("Failed to create board. Please try again later.");
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
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default CreateBoardComponent;
