// EditBoardName.tsx
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useBoard } from "../context/BoardContext";
import ErrorMessage from "./ErrorMessage";

interface EditBoardNameProps {
  onSuccess?: (updatedName: string) => void; // callback for successful name updates
  onCancel?: () => void; // callback for cancel of edit board name
}

const EditBoardName: React.FC<EditBoardNameProps> = ({ onSuccess }) => {
  const { selectedBoard, setTitleText, updateTitleText, setIsToastSuccess } = useBoard();
  const [newName, setNewName] = useState(selectedBoard!.name);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [originalName, setOriginalName] = useState(selectedBoard!.name); // holds the most recent saved name

  useEffect(() => {
    setNewName(selectedBoard!.name); // sync with board name when in edit mode
    setOriginalName(selectedBoard!.name); // Initialize originalName with the board's current name
  }, [selectedBoard!.name]);

  const handleEditClick = () => {
    setIsEditing(true);
    setTitleText("");
  };

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setNewName(originalName); // Revert to the most recently saved board name in case of cancel
    updateTitleText();
		setError(null);
  }, [originalName]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCancel();
    };
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleCancel]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
    setError(null); // Clear error when user starts typing
  };

  const handleSubmit = async () => {
    if (!newName.trim()) {
      setError("Please name your board.");
      return;
    }

    
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/boards/${selectedBoard!.uuid}`,
        { name: newName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Board name changed successfully:", response.data);

      setIsLoading(false);
      setIsEditing(false); // Exit editing mode after successful save
      setOriginalName(newName); // Update originalName with the new name
      if (onSuccess) onSuccess(newName); // Call onSuccess callback
      setIsToastSuccess("Board name changed successfully");
      setTimeout(() => {
        setIsToastSuccess('')
      }, 1000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          setError("Board name already exists, please try another.");
					return;
        } else {
          setError("Failed to update board name. Please try again later.");
        }
      } else {
        console.log("Network error.");
      }
      setIsLoading(false);
    }
		setIsLoading(true);
    setError(null);
    updateTitleText();
  };

  return (
    <div className="flex">
      {!isEditing ? (
        <button
          onClick={handleEditClick}
          className="bg-secondaryElements text-primaryText px-4 py-2 rounded font-primary hover:text-primaryTextLighter"
        >
          Edit
        </button>
      ) : (

        <main className='flex-col'>
					<div>
						<input
							type="text"
							value={newName}
							onChange={handleInputChange}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleSubmit();
								}
							}}
							size={newName.length - 1}
							className="text-3xl font-bold font-primary border rounded px-2"
							maxLength={30}
						/>
						<button
							onClick={handleSubmit}
							disabled={isLoading}
							className="ml-2 bg-secondaryElements font-primary text-primaryText px-4 py-2 rounded hover:text-primaryTextLighter"
						>
							Save
						</button>
						<button
							onClick={handleCancel}
							className="ml-2 bg-secondaryElements font-primary text-primaryText px-4 py-2 rounded hover:text-primaryTextLighter"
						>
							Cancel
						</button>
					</div>
          <ErrorMessage message={error} />
        </main>

      )}
    </div>
  );
};

export default EditBoardName;
