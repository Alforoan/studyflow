
import React, { useEffect, useState } from "react";
import { useBoard } from "../context/BoardContext";
import { Board } from "../types";
import { v4 as uuidv4 } from "uuid";
import { useTemplates } from "../context/TemplateContext";

const DownloadTemplateComponent = () => {
  const { selectedBoard, handleDownloadTemplate } = useBoard();
  const { setIsTemplate } = useTemplates();
  const [templateToDownload, setTemplateToDownload] = useState<Board>(
    selectedBoard!
  );

  const handlePressDownload = () => {
    console.log(selectedBoard!.name);
    setTemplateToDownload((prevBoard) => ({
      ...prevBoard,
      uuid: uuidv4(),
    }));
    handleDownloadTemplate(templateToDownload);
    setIsTemplate(false);
  };
  return (
    <div className="flex">
      <button
        onClick={handlePressDownload}
        className="bg-secondaryElements text-primaryText px-4 py-2 rounded font-primary hover:text-primaryTextLighter"
      >
        Download
      </button>
    </div>
  );
};

export default DownloadTemplateComponent;
