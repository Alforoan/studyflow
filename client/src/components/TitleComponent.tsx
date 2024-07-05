import React from "react";
import { useBoard } from "../context/BoardContext";
import { useTemplates } from "../context/TemplateContext";
import EditBoardName from "./EditBoardName";

const TitleComponent = () => {
  const {
    selectedBoard,
    selectedCard,
    setSelectedBoard,
    setSelectedCard,
    tileText,
    updateTitleText,
    isSearching,
    setIsSearching,
  } = useBoard();

  const { isTemplate, setIsTemplate, templateIsOwned } = useTemplates();

  const handleGoBack = () => {
    if (selectedCard) {
      setSelectedCard(null);
    } else if (selectedBoard) {
      setSelectedBoard(null);
      if (isTemplate) {
        setIsTemplate(false);
      }
    }

    if (!selectedCard && !selectedBoard && isSearching) setIsSearching(false);
  };
  return (
    <>
      <h1
        className="cursor-pointer text-3xl font-bold font-primary mr-4"
        onClick={() => handleGoBack()}
      >
        {tileText}
      </h1>

      {selectedBoard && !selectedCard && (!isTemplate || templateIsOwned) && (
        <>
          <EditBoardName
            onSuccess={(updatedName: string) => {
              setSelectedBoard((prevBoard) => {
                if (prevBoard) {
                  return { ...prevBoard, name: updatedName };
                }
                updateTitleText();
                return prevBoard;
              });
            }}
          />
        </>
      )}
    </>
  );
};

export default TitleComponent;
