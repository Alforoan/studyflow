import React, { useEffect, useState } from "react";
import { Board } from "../types";
import { v4 as uuidv4 } from "uuid";
import { useBoard } from "../context/BoardContext";
import ErrorMessage from "./ErrorMessage";
import { validateTextInput } from "../utils/inputUtils";

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
  const { handleAddNewBoard, userBoards, setIsToastSuccess } = useBoard();

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
    const boardName = newBoard.name.trim();

    if (!boardName) {
      setError("Please name your board.");
      return;
    }

    // sanitize and clean the board name
    const isValidated = validateTextInput(boardName);

    // ensure cleaned board name is not empty
    if (!isValidated) {
      setError("Please enter a valid board name.");
      return;
    }

    // Check if the board name already exists locally
    if (userBoards.some((board) => board.name === isValidated)) {
      setError("Board name already exists. Please choose another.");
      return;
    }

    try {
      handleAddNewBoard({ ...newBoard, name: isValidated });
      setIsToastSuccess("Board added successfully");
      setTimeout(() => {
        setIsToastSuccess("");
      }, 1000);
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
          aria-label="Board Name Input"
        />
        <button
          className="border rounded p-2 w-1/2 mr-2 bg-flair font-primary text-white px-4 py-2 hover:text-secondaryElements"
          onClick={() => handleSubmit()}
          aria-label="Create New Board Button"
        >
          Create New Board
        </button>
        <button
          className="border rounded p-2 bg-warning hover:text-secondaryElements text-white"
          onClick={handleCancel}
          aria-label="Cancel Button"
        >
          Cancel
        </button>
      </div>
      {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
      <ErrorMessage message={error} />
    </div>
  );
};

export default CreateBoardComponent;
