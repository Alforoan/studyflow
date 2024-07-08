import { useState } from "react";
import { useBoard } from "../context/BoardContext";
import { useTemplates } from "../context/TemplateContext";
import { v4 as uuidv4 } from "uuid";
import ButtonComponent, { ButtonStyle } from "./ButtonComponent";
import { Board, Columns } from "../types";

const UploadBoardComponent = () => {
  const { selectedBoard, setIsToastSuccess } = useBoard();
  const [boardName, setBoardName] = useState(selectedBoard!.name);
  const { handleUploadNewTemplate } = useTemplates();

  const setColumnsToBacklog = (board: Board): Board => {
    const backlogCards = board
      .cards!.filter((card) => card.column === Columns.backlog)
      .sort((a, b) => a.order - b.order);
    const inProgressCards = board
      .cards!.filter((card) => card.column === Columns.inProgress)
      .sort((a, b) => a.order - b.order);
    const completedCards = board
      .cards!.filter((card) => card.column === Columns.completed)
      .sort((a, b) => a.order - b.order);

    const updatedCards = backlogCards
      .concat(inProgressCards, completedCards)
      .map((card, index) => {
        return { ...card, column: Columns.backlog, order: index + 1 };
      });

    return { ...board, cards: updatedCards };
  };

  const handleClickUpload = () => {
    setBoardName(selectedBoard!.name);
    setIsToastSuccess("Board successfully uploaded!");
    setTimeout(() => {
      setIsToastSuccess("");
    }, 1000);

    const boardToUpload = {
      ...setColumnsToBacklog(selectedBoard!),
      name: boardName,
      uuid: uuidv4(),
    };
    handleUploadNewTemplate(boardToUpload);
  };
  return (
    <ButtonComponent
      click={handleClickUpload}
      text={"Upload Template"}
      buttonType={ButtonStyle.OuterPrimary}
    />
  );
};

export default UploadBoardComponent;
