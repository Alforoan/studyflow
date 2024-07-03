import { useState } from "react";
import { useBoard } from "../context/BoardContext";
import { useTemplates } from "../context/TemplateContext";
import { v4 as uuidv4 } from "uuid";

const UploadBoardComponent = () => {
  const { selectedBoard, setIsToastSuccess } = useBoard();
  const [boardName, setBoardName] = useState(selectedBoard!.name);
  const { handleUploadNewTemplate } = useTemplates();

  const handleClickUpload = () => {
    setBoardName(selectedBoard!.name);
    setIsToastSuccess('Board successfully uploaded!')
    setTimeout(() => {
      setIsToastSuccess("");
    }, 1000);
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
