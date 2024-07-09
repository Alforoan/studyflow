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
    console.log(template.name);
    setSelectedBoard(template);
    setIsTemplate(true);
    setIsSearching(false);
  };

  const getTotalLength = () => {
    let total = 0;
    template.cards.forEach((card) => {
      total += card.details.timeEstimate ?? 0;
    });

    return total;
  };

  const handleClickDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirmingDelete(true);
  };

  const handleCancelDelete = () => {
    console.log("canceling delete");
  };

  const handleConfirmDelete = async () => {
    console.log("confirming delete");

    await deleteBoard(template.uuid, true);
    setSelectedBoard(null);
    setIsToastSuccess("Template deleted successfully");
    setTimeout(() => {
      setIsToastSuccess("");
    }, 1000);

    setUserTemplates((prev) =>
      prev.filter((temp: Template) => temp.uuid !== template.uuid)
    );
    setIsConfirmingDelete(false);
  };

  return isLoading ? (
    <Loading isLoading={isLoading}/>
  ) : (
    <div
      onClick={() => handleClickTemplate()}
      className="bg-secondaryElements border border-secondaryElements-200 p-4 shadow-sm flex-col items-center justify-center rounded relative"
    >
      <h1 className="text-center text-primaryText text-lg font-medium pb-4">
        {template.name}
      </h1>
      {templateIsOwned && (
        <div
          onClick={(e) => handleClickDelete(e)}
          className="absolute top-0 right-0 p-1"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
      )}

      <p className="flex items-center">
        {<PiCards aria-hidden="true" className="mr-1" />}Total cards:{" "}
        {template.cards!.length - 1}
      </p>
      <p className="flex items-center">
        {<PiDownloadSimple aria-hidden="true" className="mr-1" />}Downloads:{" "}
        {template.downloads}
      </p>
      <p className="flex items-center">
        {<MdOutlineTimer aria-hidden="true" className="mr-1" />}Length:{" "}
        {getTotalLength()} Minutes
      </p>
      <p className="flex items-center">
        {<PiUploadSimple aria-hidden="true" className="mr-1" />}Author:{" "}
        {authorName}
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
