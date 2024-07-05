import React, { createContext, useState, ReactNode } from "react";
import Modal from "../components/DeleteModal";
import useDeleteBoard from "../hooks/useDeleteBoard";
import useGetUserBoards from "../hooks/useGetUserBoards";
import { Board } from "../types";
import { useBoard } from "./BoardContext";
import { useTemplates } from "./TemplateContext";

interface DeleteBoardContextType {
  deleteBoardModal: (id: string) => void;
  setModalOpen: (isOpen: boolean) => void;
  handleDeleteBoard: () => void;
  currentBoards: Board[];
  setCurrentBoards: (boards: Board[]) => void;
  currentBoardId: string;
  handleDeleteTemplate: () => void;
}

const defaultSetCurrentBoards: (boards: Board[]) => void = () => {};

export const DeleteBoardContext = createContext<DeleteBoardContextType>({
  deleteBoardModal: () => {},
  setModalOpen: () => {},
  handleDeleteBoard: () => {},
  currentBoards: [],
  setCurrentBoards: defaultSetCurrentBoards,
  currentBoardId: "",
  handleDeleteTemplate: () => {},
});

interface DeleteBoardProviderProps {
  children: ReactNode;
}

export const DeleteBoardProvider: React.FC<DeleteBoardProviderProps> = ({
  children,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentBoardId, setCurrentBoardId] = useState<string>("");
  const [currentBoards, setCurrentBoards] = useState<Board[]>([]);
  const { getUserBoards } = useGetUserBoards();
  const { deleteBoard } = useDeleteBoard();
  const { setIsToastSuccess, setSearchedBoards, searchInput } = useBoard();
  const { setIsTemplate } = useTemplates();

  const requestDeleteBoard = (id: string) => {
    setCurrentBoardId(id);
    setModalOpen(true);
  };

  const handleDeleteTemplate = async () => {
    await deleteBoard(currentBoardId, true);
    setIsToastSuccess("Template deleted successfully");
    setTimeout(() => {
      setIsToastSuccess("");
    }, 1000);
    setModalOpen(false);
  };

  const handleDeleteBoard = async () => {
    console.log("DELETING BOARD????");
    await deleteBoard(currentBoardId, false);
    setIsToastSuccess("Board deleted successfully");
    setTimeout(() => {
      setIsToastSuccess("");
    }, 1000);
    const newBoards = await getUserBoards();
    let filteredBoards = [];
    if (searchInput) {
      filteredBoards = newBoards.filter((board) =>
        board.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSearchedBoards(filteredBoards);
    }
    setModalOpen(false);
    setCurrentBoards(newBoards);
  };

  const cancelDeleteBoard = () => {
    setModalOpen(false);
    setIsTemplate(false);
  };

  return (
    <DeleteBoardContext.Provider
      value={{
        deleteBoardModal: requestDeleteBoard,
        setModalOpen,
        handleDeleteBoard,
        currentBoards,
        setCurrentBoards,
        currentBoardId,
        handleDeleteTemplate,
      }}
    >
      {children}
      {isModalOpen && (
        <Modal
          type={null}
          isOpen={isModalOpen}
          onClose={cancelDeleteBoard}
          onDelete={handleDeleteBoard}
          message={"This will delete all cards and the board. Are you sure?"}
        />
      )}
    </DeleteBoardContext.Provider>
  );
};
