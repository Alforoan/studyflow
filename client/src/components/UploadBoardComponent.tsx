import React, { useState } from "react";
import { useBoard } from "../context/BoardContext";
import { useTemplates } from "../context/TemplateContext";
import { v4 as uuidv4 } from "uuid";

const UploadBoardComponent = () => {
  const { selectedBoard } = useBoard();
  const [boardName, setBoardName] = useState(selectedBoard!.name);
  const { handleUploadNewTemplate } = useTemplates();

  const handleClickUpload = () => {
    console.log(selectedBoard?.name);
    // THIS SHOULD POP UP MODAL TO CONFIRM WITH AN OPPORTUNITY TO CHANGE BOARD NAME
    // TOAST SUCCESS NEEDED AFTER UPLOAD
    const boardToUpload = {
      ...selectedBoard!,
      name: boardName,
      uuid: uuidv4(),
    };
    handleUploadNewTemplate(boardToUpload);
  };
  return (
    <button
      onClick={handleClickUpload}
      className="bg-flair text-white px-4 py-2 rounded font-primary"
    >
      Upload
    </button>
  );
};

export default UploadBoardComponent;
