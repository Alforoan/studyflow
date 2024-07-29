import React, { useState } from "react";
import { Template } from "../types";
import { useTemplates } from "../context/TemplateContext";
import { useBoard } from "../context/BoardContext";
import { MdOutlineTimer } from "react-icons/md";
import { PiDownloadSimple, PiCards, PiUploadSimple } from "react-icons/pi";
import Loading from "./Loading";
import DeleteModal from "./DeleteModal";
import { useDeleteBoard } from "../hooks/useAPI";

interface TemplatePreviewProps {
  template: Template;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ template }) => {
  const { setIsTemplate, setUserTemplates, templateIsOwned } = useTemplates();
  const { setSelectedBoard, setIsSearching, isLoading } = useBoard();

  const [isConfirmingDelete, setIsConfirmingDelete] = useState<boolean>(false);
  const { deleteBoard } = useDeleteBoard();
  const { setIsToastSuccess } = useBoard();

  const authorName = template.author.split("@")[0];

  const handleClickTemplate = () => {
    if (isConfirmingDelete) return;
    setSelectedBoard(template);
    setIsTemplate(true);
    setIsSearching(false);
  };

  const getTotalLength = () => {
    return template.cards.reduce((total, card) => total + (card.details.timeEstimate ?? 0), 0);
  };

  const handleClickDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirmingDelete(true);
  };

  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  const handleConfirmDelete = async () => {
    await deleteBoard(template.uuid, true);
    setSelectedBoard(null);
    setIsToastSuccess("Template deleted successfully");
    setTimeout(() => {
      setIsToastSuccess("");
    }, 1000);
    setUserTemplates((prevTemplates) => prevTemplates.filter((temp) => temp.uuid !== template.uuid));
    setIsConfirmingDelete(false);
  };

  return (
    <div
      onClick={handleClickTemplate}
      className="template-preview bg-secondaryElements border border-secondaryElements-200 p-4 shadow-sm rounded-lg relative cursor-pointer transition duration-300 transform hover:scale-105"
      style={{ minHeight: "200px" }} // Example minimum height; adjust as needed
    >
      <h1 className="text-center text-primaryText text-lg font-medium pb-4">{template.name}</h1>
      {templateIsOwned && (
        <div
          onClick={handleClickDelete}
          className="absolute top-2 right-2 p-1 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-gray-600"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
      )}
      <p className="flex items-center">
        <PiCards className="mr-1" aria-hidden="true" /> Total cards:{" "}
        {template.cards.filter((card) => card.id !== "0").length}
      </p>
      <p className="flex items-center">
        <PiDownloadSimple className="mr-1" aria-hidden="true" /> Downloads: {template.downloads}
      </p>
      <p className="flex items-center">
        <MdOutlineTimer className="mr-1" aria-hidden="true" /> Length: {getTotalLength()} Minutes
      </p>
      <p className="flex items-center">
        <PiUploadSimple className="mr-1" aria-hidden="true" /> Author: {authorName}
      </p>
      {isConfirmingDelete && (
        <DeleteModal
          isOpen={isConfirmingDelete}
          onClose={handleCancelDelete}
          onDelete={handleConfirmDelete}
          message="Are you sure you want to delete this template?"
          type="template"
          id={template.uuid}
        />
      )}
    </div>
  );
};

export default TemplatePreview;
