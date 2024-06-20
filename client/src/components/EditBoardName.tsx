// EditBoardName.tsx
import React, { useState } from "react";
import axios from "axios";
import { Board } from "../types";

interface EditBoardNameProps {
  board: Board;
  boardID: number | null;
  onSuccess?: () => void; // Optional callback for handling successful name update
}

const EditBoardName: React.FC<EditBoardNameProps> = ({ board, boardID, onSuccess }) => {
  const [newName, setNewName] = useState(board.name);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
    setError(null); // Clear error when user starts typing
  };

  const handleSubmit = async () => {
    if (!newName.trim()) {
      setError("Please name your board.");
      return;
    }

    if (newName.length > 30) {
      setError("Board name must be 30 characters or less.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/api/boards/${boardID}`,
        { name: newName }
      );

      console.log("Board name changed successfully:", response.data);

      setIsLoading(false);
      setIsEditing(false); // Exit editing mode after successful save
      if (onSuccess) onSuccess(); // Call onSuccess callback if provided

    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          setError("Board name already exists, please try another.");
        } else {
          setError("Failed to update board name. Please try again later.");
        }
      } else {
        console.log("Network error.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div>
      {!isEditing ? (
        <button onClick={handleEditClick} className="bg-secondaryElements text-primaryText px-4 py-2 rounded hover:text-primaryTextLighter">
          Edit
        </button>
      ) : (
        <div>
          <input
            type="text"
            value={newName}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-2 py-1 mb-2"
            maxLength={30}
          />
          <button onClick={handleSubmit} disabled={isLoading} className="bg-secondaryElements text-primaryText px-4 py-2 rounded hover:text-primaryTextLighter">
            {isLoading ? "Saving..." : "Save"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default EditBoardName;
