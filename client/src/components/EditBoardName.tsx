// EditBoardName.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useBoard } from "../context/BoardContext";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";
import { useTemplates } from "../context/TemplateContext";
import { usePutBoard } from "../hooks/useAPI";
import ButtonComponent, { ButtonStyle } from "./ButtonComponent";

interface EditBoardNameProps {
  onSuccess?: (updatedName: string) => void; // callback for successful name updates
  onCancel?: () => void; // callback for cancel of edit board name
}

const EditBoardName: React.FC<EditBoardNameProps> = ({ onSuccess }) => {
  const { selectedBoard, setTitleText, updateTitleText, setIsToastSuccess } =
    useBoard();
  const [newName, setNewName] = useState(selectedBoard!.name);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalName, setOriginalName] = useState(selectedBoard!.name); // holds the most recent saved name

  const { putBoard, isLoading, error: apiError } = usePutBoard();
  const { isTemplate } = useTemplates();

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
      await putBoard(newName, selectedBoard!.uuid, isTemplate);
      setIsEditing(false);

      setOriginalName(newName); // Update originalName with the new name
      if (onSuccess) onSuccess(newName); // Call onSuccess callback
      setIsToastSuccess("Board name changed successfully");
      setTimeout(() => {
        setIsToastSuccess("");
      }, 1000);
    } catch (err) {
      if (err) setError(apiError!.message);
    }
    setError(null);
    updateTitleText();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex">
      {!isEditing ? (
        <ButtonComponent
          click={handleEditClick}
          text={"Edit"}
          buttonType={ButtonStyle.OuterSecondary}
        />
      ) : (
        <main className="flex-col">
          <div className="flex space-x-2">
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
              aria-label="Board Name"
            />

            <ButtonComponent
              click={handleSubmit}
              text={"Save"}
              buttonType={ButtonStyle.OuterPrimary}
              additionalStyles="ml-4"
            />

            <ButtonComponent
              click={handleCancel}
              text={"Cancel"}
              buttonType={ButtonStyle.OuterCancel}
            />
          </div>
          <ErrorMessage message={error} />
        </main>
      )}
    </div>
  );
};

export default EditBoardName;
