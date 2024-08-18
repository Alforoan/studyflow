// hooks/useStateReset.ts
import { useCallback } from "react";
import { useBoard } from "../context/BoardContext";
import { useTemplates } from "../context/TemplateContext";

const useStateReset = () => {
  const {
    setCurrentPage,
    setSelectedCard,
    setSelectedBoard,
    setIsSearching,
    setIsAddingNewBoard,
  } = useBoard();
  const { setIsTemplate } = useTemplates();

  const handleHomeClick = useCallback(() => {
    setCurrentPage("Home");
    setSelectedCard(null);
    setSelectedBoard(null);
    setIsSearching(false);
    setIsTemplate(false);
    setIsAddingNewBoard(false);
  }, [
    setCurrentPage,
    setSelectedCard,
    setSelectedBoard,
    setIsSearching,
    setIsTemplate,
    setIsAddingNewBoard,
  ]);

  const handleAccountClick = useCallback(() => {
    setCurrentPage("Account");
    setSelectedCard(null);
    setSelectedBoard(null);
    setIsSearching(false);
    setIsTemplate(false);
    setIsAddingNewBoard(false);
  }, [
    setCurrentPage,
    setSelectedCard,
    setSelectedBoard,
    setIsSearching,
    setIsTemplate,
    setIsAddingNewBoard,
  ]);

  const resetState = () => {
    setSelectedCard(null);
    setSelectedBoard(null);
    setIsSearching(false);
    setIsTemplate(false);
    setIsAddingNewBoard(false);
  };

  return { handleHomeClick, handleAccountClick, resetState };
};

export default useStateReset;
