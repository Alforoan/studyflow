import { useState } from "react";
import { useBoard } from "../context/BoardContext";
import { useTemplates } from "../context/TemplateContext";
import { v4 as uuidv4 } from "uuid";
// import ButtonComponent, { ButtonStyle } from "./ButtonComponent";
import { Board, Columns } from "../types";
import { Button, Icon } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

interface UploadProps {
  isEditingTitle: Boolean;
}

const UploadBoardComponent: React.FC<UploadProps> = ({ isEditingTitle }) => {
  const { selectedBoard, setIsToastSuccess, setSelectedBoard } = useBoard();
  const [boardName, setBoardName] = useState(selectedBoard!.name);
  const { handleUploadNewTemplate } = useTemplates();
  const navigate = useNavigate();

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

  const handleClickUpload = async() => {
    setBoardName(selectedBoard!.name);

    const boardToUpload = {
      ...setColumnsToBacklog(selectedBoard!),
      name: selectedBoard!.name,
      uuid: uuidv4(),
    };

    await handleUploadNewTemplate(boardToUpload);


  };
  if (isEditingTitle) {
    return;
  }
  return (
    <Button
      onClick={handleClickUpload}
      bg="gray.500"
      color="white"
      ml={4}
      px={4}
      justifyContent={{ base: "center", md: "left" }}
      leftIcon={<Icon as={DownloadIcon} transform="rotate(180deg)" />}
      _hover={{ bg: "gray.600" }}
      aria-label="Upload Template Button"
    >
      Make Board Public
    </Button>
  );
};

export default UploadBoardComponent;
