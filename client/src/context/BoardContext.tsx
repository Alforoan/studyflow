import React, { createContext, useState, useContext, ReactNode } from "react";
import { Board, Card, Columns } from "../types";
import usePostNewBoard from "../hooks/usePostNewBoard";

import usePostNewCard from "../hooks/usePostNewCard";
import useDeleteCard from "../hooks/useDeleteCard";
import useEditCard from "../hooks/useEditCard";
import { v4 as uuidv4 } from "uuid";
import {
  databaseCards,
  mobileAppCards,
  newCard,
  sortingCards,
  webDevCards,
} from "../dummyData";

// Define the context shape
interface BoardContextType {
  selectedBoard: Board | null;
  setSelectedBoard: (
    value: Board | null | ((prevBoard: Board | null) => Board | null)
  ) => void;
  selectedCard: Card | null;
  setSelectedCard: (card: Card | null) => void;
  userBoards: Board[];
  setUserBoards: (boards: Board[]) => void;
  tileText: string;
  setTitleText: (text: string) => void;
  updateTitleText: () => void;
  handleAddNewBoard: (newBoard: Board) => void;
  isAddingNewBoard: boolean;
  setIsAddingNewBoard: (isAddingBoard: boolean) => void;
  handlePostNewCard: (newCard: Card) => void;
  handleUpdateCard: (newCard: Card) => void;
  handleDeleteCard: (cardToDelete: Card) => void;
  populateDummyData: () => void;
}

// Create the context with a default undefined value
const BoardContext = createContext<BoardContextType | undefined>(undefined);

// Create a provider component
export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [userBoards, setUserBoards] = useState<Board[]>([]);
  const [tileText, setTitleText] = useState("Home");
  const [isAddingNewBoard, setIsAddingNewBoard] = useState(false);
  const { postNewCard } = usePostNewCard();
  const { postNewBoard, error: postBoardError } = usePostNewBoard();
  const { editCard } = useEditCard();
  const { deleteCard } = useDeleteCard();

  const updateTitleText = () => {
    if (selectedCard) {
      setTitleText(`👈 ${selectedCard.cardName}`);
    } else if (selectedBoard) {
      setTitleText(`👈 ${selectedBoard.name}`);
    } else {
      setTitleText("Home");
    }
  };

  const handleAddNewBoard = async (newBoard: Board) => {
    if (userBoards.some((board) => board.name === newBoard.name)) {
      postNewBoard(newBoard);
      return;
    }
    setIsAddingNewBoard(false);
    newBoard.cards = [newCard];
    postNewBoard(newBoard);
    const newBoards = [...userBoards, newBoard];
    setUserBoards(newBoards);
    setSelectedBoard(newBoard);
    console.log(newBoard);
  };

  const handlePostNewCard = (newCard: Card) => {
    postNewCard(newCard, selectedBoard!.uuid!);
    let updatedBoard = selectedBoard;
    if (updatedBoard && updatedBoard.cards) {
      updatedBoard.cards.push(newCard);
    }

    setSelectedBoard(updatedBoard);
  };

  const handleUpdateCard = async (newCard: Card) => {
    if (newCard.id !== "0") {
      if (selectedBoard) {
        await editCard(newCard);
        console.log("UPDATING CARD !!!!!", newCard);
        let updatedCards: Card[] = selectedBoard.cards!.map((card) => {
          if (card.id === newCard.id) {
            return newCard;
          } else {
            return card;
          }
        });
        console.log(updatedCards);
        const updatedBoard: Board = {
          ...selectedBoard,
          cards: updatedCards,
        };

        setSelectedBoard(updatedBoard);
      }
    }
  };

  const handleDeleteCard = async (cardToDelete: Card) => {
    if (cardToDelete.id !== "0") {
      if (selectedBoard) {
        deleteCard(cardToDelete);

        let updatedCards: Card[] = selectedBoard.cards!.filter(
          (card) => card.id !== cardToDelete.id
        );
        const updatedBoard: Board = {
          ...selectedBoard,
          cards: updatedCards,
        };

        setSelectedBoard(updatedBoard);
      }
    }
  };

  const populateDummyData = () => {
    const dummyCardLists = [
      sortingCards,
      databaseCards,
      webDevCards,
      mobileAppCards,
    ];

    const dummyBoardTitles = [
      "Sorting Algorithms",
      "Database Design",
      "Web Development",
      "Mobile App Development",
    ];

    dummyCardLists.forEach((list, i) => {
      let uuid1 = uuidv4();
      const dummyBoard: Board = {
        name: dummyBoardTitles[i],
        uuid: uuid1,
        cards: list,
      };
      postNewBoard(dummyBoard);
      dummyBoard.cards?.forEach((card) => {
        postNewCard(card, uuid1);
      });
      dummyBoard.cards?.unshift(newCard);
      const newBoards = [...userBoards, dummyBoard];
      setUserBoards(newBoards);
    });
  };

  return (
    <BoardContext.Provider
      value={{
        selectedBoard,
        setSelectedBoard,
        selectedCard,
        setSelectedCard,
        userBoards,
        setUserBoards,
        tileText,
        setTitleText,
        updateTitleText,
        handleAddNewBoard,
        isAddingNewBoard,
        setIsAddingNewBoard,
        handlePostNewCard,
        handleDeleteCard,
        handleUpdateCard,
        populateDummyData,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

// Custom hook to use the context
export const useBoard = () => {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
};
