import React from "react";
import { Template } from "../types";
import { useTemplates } from "../context/TemplateContext";
import { useBoard } from "../context/BoardContext";

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

      <p>Total cards: {template.cards!.length - 1}</p>
      <p># Downloads: {template.downloads}</p>
      <p>Length: {getTotalLength()} Minutes</p>
      <p>Author: {template.author}</p>
    </div>
  );
};

export default TemplatePreview;
