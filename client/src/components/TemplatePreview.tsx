import React from "react";
import { Template } from "../types";
import { useTemplates } from "../context/TemplateContext";
import { useBoard } from "../context/BoardContext";
import { MdOutlineTimer } from "react-icons/md";
import { PiDownloadSimple, PiCards, PiUploadSimple } from "react-icons/pi";

interface TemplatePreviewProps {
  template: Template;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ template }) => {
  const { setIsTemplate, toggleIsSearching } = useTemplates();
  const { setSelectedBoard } = useBoard();

  const handleClickTemplate = () => {
    console.log(template.name);
    setSelectedBoard(template);
    setIsTemplate(true);
    toggleIsSearching();
  };

  const getTotalLength = () => {
    let total = 0;
    template.cards.forEach((card) => {
      total += card.details.timeEstimate ?? 0;
    });

    return total;
  };

  return (
    <div
      onClick={() => handleClickTemplate()}
      className="bg-secondaryElements border border-secondaryElements-200 p-4 shadow-sm flex-col items-center justify-center rounded relative"
    >
      <h1 className="text-center text-primaryText text-lg font-medium pb-4">
        {template.name}
      </h1>

      <p className="flex items-center">{<PiCards aria-hidden="true"  className="mr-1"/>}Total cards: {template.cards!.length - 1}</p>
      <p className="flex items-center">{<PiDownloadSimple aria-hidden="true"  className="mr-1"/>}Downloads: {template.downloads}</p>
      <p className="flex items-center">{<MdOutlineTimer aria-hidden="true"  className="mr-1"/>}Length: {getTotalLength()} Minutes</p>
      <p className="flex items-center">{<PiUploadSimple aria-hidden="true"  className="mr-1"/>}Author: {template.author}</p>
    </div>
  );
};

export default TemplatePreview;
