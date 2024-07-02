import React, { createContext, useState, ReactNode } from "react";
import Modal from "../components/DeleteModal";
import useDeleteBoard from "../hooks/useDeleteBoard";
import useGetUserBoards from "../hooks/useGetUserBoards";
import { Board } from "../types";
import { useBoard } from './BoardContext';

interface DeleteBoardContextType {
  deleteBoardModal: (id: string) => void;
  setModalOpen: (isOpen: boolean) => void;
  handleDeleteBoard: () => void;
  currentBoards: Board[];
  setCurrentBoards: (boards: Board[]) => void;
  currentBoardId: string;
}

const defaultSetCurrentBoards: (boards: Board[]) => void = () => {};

export const DeleteBoardContext = createContext<DeleteBoardContextType>({
  deleteBoardModal: () => {},
  setModalOpen: () => {},
  handleDeleteBoard: () => {},
  currentBoards: [],
  setCurrentBoards: defaultSetCurrentBoards,
  currentBoardId: "",
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
  const { setIsToastSuccess } = useBoard();

  const requestDeleteBoard = (id: string) => {
    setCurrentBoardId(id);
    setModalOpen(true);
  };

  const handleDeleteBoard = async () => {
    await deleteBoard(currentBoardId);
    setIsToastSuccess("Board deleted successfully");
    setTimeout(() => {
      setIsToastSuccess("");
    }, 1000);
    const newBoards = await getUserBoards();
    setModalOpen(false);
    setCurrentBoards(newBoards);
  };

  const cancelDeleteBoard = () => {
    setModalOpen(false);
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
