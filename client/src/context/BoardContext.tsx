import { createContext, useState, useContext, ReactNode } from "react";
import { Board, Card } from "../types";
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
  isToastSuccess: string;
  setIsToastSuccess: (isToastSuccess: string) => void;
  handleDownloadTemplate: (board: Board) => void;
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
  searchedBoards: Board[];
  setSearchedBoards: (boards: Board[]) => void;
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
  const { postNewBoard } = usePostNewBoard();
  const { editCard } = useEditCard();
  const { deleteCard } = useDeleteCard();
  const [isToastSuccess, setIsToastSuccess] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchedBoards, setSearchedBoards] = useState<Board[]>([]);

  const updateTitleText = () => {
    if (selectedCard) {
      setTitleText(`👈 ${selectedCard.cardName}`);
    } else if (selectedBoard) {
      setTitleText(`👈 ${selectedBoard.name}`);
    } else {
      setTitleText("Home");
    }

    console.log(selectedBoard);
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

  const handleDownloadTemplate = async (board: Board) => {
    await postNewBoard(board);
    const newBoards = [...userBoards, board];
    setUserBoards(newBoards);

    board.cards!.forEach((card) => {
      postNewCard(card, board!.uuid!);
    });

    board.cards?.unshift(newCard);
    setSelectedBoard(null);
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
        setIsToastSuccess("Card deleted successfully");
        setTimeout(() => {
          setIsToastSuccess("");
        }, 1000);
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

  const populateDummyData = async () => {
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

    for (let i = 0; i < dummyCardLists.length; i++) {
      let list = dummyCardLists[i];
      let uuid1 = uuidv4();
      const dummyBoard: Board = {
        name: dummyBoardTitles[i],
        uuid: uuid1,
        cards: list,
      };
      await postNewBoard(dummyBoard);
      for (let i = 0; i < dummyBoard.cards!.length; i++) {
        await postNewCard(dummyBoard.cards![i], uuid1);
      }
      dummyBoard.cards?.unshift(newCard);
      setUserBoards((prev) => [...prev, dummyBoard]);
    }
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
        isToastSuccess,
        setIsToastSuccess,
        handleDownloadTemplate,
        searchInput,
        setSearchInput,
        searchedBoards,
        setSearchedBoards
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
