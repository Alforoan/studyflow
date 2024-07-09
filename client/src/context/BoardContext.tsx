import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Board, Card } from "../types";
import {
  usePostCard,
  usePostBoard,
  useDeleteCard,
  useEditCard,
  useIncrementDownloads,
} from "../hooks/useAPI";
import { v4 as uuidv4 } from "uuid";
import { newCard } from "../dummyData";

interface BoardContextType {
  selectedBoard: Board | null;
  setSelectedBoard: (
    value: Board | null | ((prevBoard: Board | null) => Board | null)
  ) => void;
  selectedCard: Card | null;
  setSelectedCard: (card: Card | null) => void;
  userBoards: Board[];
  setUserBoards: (boards: Board[]) => void;
  titleText: string;
  setTitleText: (text: string) => void;
  updateTitleText: () => void;
  handleAddNewBoard: (newBoard: Board) => void;
  isAddingNewBoard: boolean;
  setIsAddingNewBoard: (isAddingBoard: boolean) => void;
  handlePostNewCard: (newCard: Card) => void;
  handleUpdateCard: (newCard: Card, isTemplate: boolean) => void;
  handleDeleteCard: (cardToDelete: Card, isTemplate: boolean) => void;
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

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [userBoards, setUserBoards] = useState<Board[]>([]);
  const [titleText, setTitleText] = useState("Home");
  const [isAddingNewBoard, setIsAddingNewBoard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { postCard } = usePostCard();
  const { postBoard } = usePostBoard();
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
      setTitleText(`~ ${selectedCard.cardName}`);
    } else if (selectedBoard) {
      setTitleText(`~ ${selectedBoard.name}`);
    } else {
      setTitleText(currentPage);
    }

    if (isSearching && !selectedCard && !selectedBoard)
      setTitleText("~ Templates");
  };

  const handleAddNewBoard = async (newBoard: Board) => {
    if (userBoards.some((board) => board.name === newBoard.name)) {
      return;
    }
    setIsAddingNewBoard(false);
    newBoard.cards = [newCard];
    postBoard(newBoard);
    const newBoards = [...userBoards, newBoard];
    setUserBoards(newBoards);
    setSelectedBoard(newBoard);
  };

  const handlePostNewCard = (newCard: Card) => {
    postCard(newCard, selectedBoard!.uuid!, false);
    let updatedBoard = selectedBoard;
    if (updatedBoard && updatedBoard.cards) {
      updatedBoard.cards.push(newCard);
    }

    setSelectedBoard(updatedBoard);
  };

  const handleDownloadTemplate = async (board: Board) => {
    if (!userBoards.some((myBoard) => myBoard.name === board.name)) {
      board.cards!.forEach((card) => {
        card.id = uuidv4();
      });
      board.cards!.unshift(newCard);
      await postBoard(board);
      setUserBoards((prev) => [...prev, board]);
      incrementDownloads(selectedBoard!.uuid);
      board.cards!.forEach(async (card) => {
        if (card.id !== "0") {
          await postCard(card, board!.uuid!, false);
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
        let updatedCards: Card[] = selectedBoard.cards!.map((card) => {
          if (card.id === newCard.id) {
            return newCard;
          } else {
            return card;
          }
        });
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
        deleteCard(cardToDelete.id, isTemplate);
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

  return (
    <BoardContext.Provider
      value={{
        selectedBoard,
        setSelectedBoard,
        selectedCard,
        setSelectedCard,
        userBoards,
        setUserBoards,
        titleText,
        setTitleText,
        updateTitleText,
        handleAddNewBoard,
        isAddingNewBoard,
        setIsAddingNewBoard,
        handlePostNewCard,
        handleDeleteCard,
        handleUpdateCard,
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
