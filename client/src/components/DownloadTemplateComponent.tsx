import React from "react";
import { useBoard } from "../context/BoardContext";

const DownloadTemplateComponent = () => {
  const { selectedBoard } = useBoard();

  const handleDownloadTemplate = () => {
    console.log(selectedBoard!.name);
  };
  return (
    <div className="flex">
      <button
        onClick={handleDownloadTemplate}
        className="bg-secondaryElements text-primaryText px-4 py-2 rounded font-primary hover:text-primaryTextLighter"
      >
        Download
      </button>
    </div>
  );
};

export default DownloadTemplateComponent;
