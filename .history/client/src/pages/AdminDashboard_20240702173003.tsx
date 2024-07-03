import React, { useEffect, useState, useContext, useCallback } from "react";
import useGetUserBoards from "../hooks/useGetUserBoards";
import { Board } from "../types";
import BoardPreview from "../components/BoardPreview";
import BoardComponent from "../components/BoardComponent";
import { useBoard } from "../context/BoardContext";
import { DeleteBoardContext } from "../context/DeleteBoardContext";
import CreateBoardComponent from "../components/CreateBoardComponent";
import useGetCards from "../hooks/useGetCards";
import EditBoardName from "../components/EditBoardName";
import { newCard } from "../dummyData";

const AdminDashboard: React.FC = () => {
  const { getAllBoards } = useGetUserBoards();
  const { getCardsFromBoard } = useGetCards();

  const {
    selectedBoard,
    setSelectedBoard,
    selectedCard,
    setSelectedCard,
    userBoards,
    setUserBoards,
    tileText,
    updateTitleText,
    isAddingNewBoard,
    setIsAddingNewBoard,
    populateDummyData,
  } = useBoard();

  const { currentBoards, setCurrentBoards, currentBoardId } = useContext(DeleteBoardContext);

  const [showBoards, setShowBoards] = useState<Board[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const boardsFromAPI = await getAllBoards();
        const updatedBoards = await Promise.all(
          boardsFromAPI.map(async (board) => {
            const cardsFromAPI = await getCardsFromBoard(board.uuid);
            const updatedCards = [...cardsFromAPI, newCard];
            return { ...board, cards: updatedCards };
          })
        );
        setCurrentBoards(updatedBoards);
        setShowBoards(updatedBoards);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };
    fetchData();
  }, [getAllBoards, getCardsFromBoard, setCurrentBoards]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const updatedBoards = await Promise.all(
          showBoards.map(async (board) => {
            const cardsFromAPI = await getCardsFromBoard(board.uuid);
            const updatedCards = [...cardsFromAPI, newCard];
            return { ...board, cards: updatedCards };
          })
        );
        setCurrentBoards(updatedBoards);
        setUserBoards(updatedBoards);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };
    fetchCards();
  }, [showBoards, getCardsFromBoard, setCurrentBoards, setUserBoards]);

  useEffect(() => {
    const filteredBoards = userBoards.filter((board) => board.uuid !== currentBoardId);
    setUserBoards(filteredBoards);
  }, [userBoards, currentBoardId, setUserBoards]);

  useEffect(() => {
    console.log("UPDATING THE SELECTED BOARD");
    if (selectedBoard) {
      console.log(selectedBoard);
      updateTitleText();

      const updatedBoards: Board[] = userBoards.map((board) =>
        board.uuid === selectedBoard.uuid ? selectedBoard : board
      );
      setUserBoards(updatedBoards);
      console.log(userBoards);
    } else {
      updateTitleText();
    }
  }, [selectedBoard, selectedCard, userBoards, setUserBoards, updateTitleText]);

  const handleGoBack = () => {
    if (selectedCard) {
      setSelectedCard(null);
    } else if (selectedBoard) {
      setSelectedBoard(null);
    }
  };

  const handleCancel = useCallback(() => {
    setIsAddingNewBoard(false);
  }, [setIsAddingNewBoard]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCancel();
    };
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleCancel]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mt-12 mb-4">
        <h1
          className="cursor-pointer text-3xl font-bold font-primary mr-4"
          onClick={handleGoBack}
        >
          {tileText}
        </h1>
        {selectedBoard && !selectedCard && (
          <EditBoardName
            onSuccess={(updatedName: string) =>
              setSelectedBoard((prevBoard) =>
                prevBoard ? { ...prevBoard, name: updatedName } : prevBoard
              )
            }
          />
        )}
      </div>

      {!selectedBoard && !selectedCard && !isAddingNewBoard && (
        <button
          className="bg-secondaryElements font-primary text-flair px-4 py-2 mb-4 rounded hover:bg-flair hover:text-secondaryElements"
          onClick={populateDummyData}
        >
          Populate Dummy Data
        </button>
      )}

      {selectedBoard ? (
        <BoardComponent />
      ) : isAddingNewBoard ? (
        <CreateBoardComponent handleCancel={handleCancel} />
      ) : (
        <div className="text-center">
          <button
            className="bg-flair font-primary text-secondaryElements px-4 py-2 mb-4 rounded hover:text-white"
            onClick={() => setIsAddingNewBoard(true)}
          >
            Create a new board
          </button>

          <ul className="flex flex-wrap justify-center gap-4">
            {showBoards.map((board) => (
              <li key={board.uuid} className="cursor-pointer">
                <BoardPreview
                  board={board}
                  handleSelectBoard={() => setSelectedBoard(board)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
