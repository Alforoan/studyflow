import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
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
import useIncrementDownloads from "../hooks/useIncrementDownloads";

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
  handleUpdateCard: (newCard: Card, isTemplate: boolean) => void;
  handleDeleteCard: (cardToDelete: Card, isTemplate: boolean) => void;
  populateDummyData: () => void;
  isToastSuccess: string;
  setIsToastSuccess: (isToastSuccess: string) => void;
  handleDownloadTemplate: (board: Board) => void;
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
  searchedBoards: Board[];
  setSearchedBoards: (boards: Board[]) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  setIsSearching: (isSearching: boolean) => void;
  isSearching: boolean;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
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
  const [isLoading, setIsLoading] = useState(false);
  const { postNewCard } = usePostNewCard();
  const { postNewBoard } = usePostNewBoard();
  const { editCard } = useEditCard();
  const { deleteCard } = useDeleteCard();
  const [isToastSuccess, setIsToastSuccess] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchedBoards, setSearchedBoards] = useState<Board[]>([]);
  const [currentPage, setCurrentPage] = useState<string>("Home");

  const [isSearching, setIsSearching] = useState<boolean>(false);

  const { incrementDownloads } = useIncrementDownloads();

  useEffect(() => {
    updateTitleText();
  }, [currentPage, isSearching, selectedCard, selectedBoard]);

  const updateTitleText = () => {
    if (selectedCard) {
      setTitleText(`👈 ${selectedCard.cardName}`);
    } else if (selectedBoard) {
      setTitleText(`👈 ${selectedBoard.name}`);
    } else {
      setTitleText(currentPage);
    }

    if (isSearching && !selectedCard && !selectedBoard)
      setTitleText("👈 Templates");
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
    if (!userBoards.some((myBoard) => myBoard.name === board.name)) {
      await postNewBoard(board);
      setUserBoards((prev) => [...prev, board]);
      incrementDownloads(selectedBoard!.uuid);
      board.cards!.forEach(async (card) => {
        if (card.id !== "0") {
          console.log("POSTING", card.id);
          const postResponse = await postNewCard(
            { ...card, id: uuidv4() },
            board!.uuid!
          );
          console.log("POST RESPONSE", postResponse);
        }
      });
      setSelectedBoard(null);
    } else {
      // TOAST ERRROR MESSAGE SAYING "THIS TEMPLATE WAS ALREADY DOWNLOADED"
    }
  };

  const handleUpdateCard = async (newCard: Card, isTemplate: boolean) => {
    if (newCard.id !== "0") {
      if (selectedBoard) {
        await editCard(newCard, isTemplate);
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

  const handleDeleteCard = async (cardToDelete: Card, isTemplate: boolean) => {
    if (cardToDelete.id !== "0") {
      if (selectedBoard) {
        deleteCard(cardToDelete, isTemplate);
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
        setSearchedBoards,
        currentPage,
        setCurrentPage,
        setIsSearching,
        isSearching,
        isLoading,
        setIsLoading,
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
