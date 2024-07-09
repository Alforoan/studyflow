import React, { useEffect, useState, useContext, useCallback } from "react";
import { Board } from "../types";
import BoardPreview from "../components/BoardPreview";
import BoardComponent from "../components/BoardComponent";
import { useBoard } from "../context/BoardContext";
import { DeleteBoardContext } from "../context/DeleteBoardContext";
import CreateBoardComponent from "../components/CreateBoardComponent";
import EditBoardName from "../components/EditBoardName";
import { newCard } from "../dummyData";
import { useGetBoards, useGetCards } from "../hooks/useAPI";
import { Helmet } from "react-helmet-async";

const AdminDashboard: React.FC = () => {
  const { getBoards } = useGetBoards();
  const [showBoards, setShowBoards] = useState<Board[]>([]);

  const {
    selectedBoard,
    setSelectedBoard,
    selectedCard,
    setSelectedCard,
    userBoards,
    setUserBoards,
    titleText,
    updateTitleText,
    isAddingNewBoard,
    setIsAddingNewBoard,
  } = useBoard();

  const { currentBoards, setCurrentBoards, currentBoardId } =
    useContext(DeleteBoardContext);
  const { getCards } = useGetCards();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const boardsFromAPI = await getBoards(true);
        const updatedBoards = await Promise.all(
          boardsFromAPI.map(async (board) => {
            const cardsFromAPI = await getCards(board.uuid, false);
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
    fetchBoards();
  }, []);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const updatedBoards = await Promise.all(
          showBoards.map(async (board) => {
            const cardsFromAPI = await getCards(board.uuid, false);
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
  }, []);

  useEffect(() => {
    const filteredBoards = userBoards.filter(
      (board) => board.uuid !== currentBoardId
    );
    setUserBoards(filteredBoards);
  }, [currentBoards]);

  useEffect(() => {
    console.log("UPDATING THE SELECTED BOARD");
    if (selectedBoard) {
      console.log(selectedBoard);
      updateTitleText();

      // now any time you change the selectedBoard state this will update the user boards
      const updatedBoards: Board[] = userBoards.map((board) => {
        if (board.uuid === selectedBoard.uuid) {
          return selectedBoard;
        } else {
          return board;
        }
      });
      setUserBoards(updatedBoards);
      console.log(userBoards);
    } else {
      updateTitleText();
    }
  }, [selectedBoard, selectedCard]);

  const handleGoBack = () => {
    if (selectedCard) {
      setSelectedCard(null);
    } else if (selectedBoard) {
      setSelectedBoard(null);
    }
  };

  const handleCancel = useCallback(() => {
    setIsAddingNewBoard(false);
  }, []);

  useEffect(() => {
    console.log("effect");
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCancel();
    };
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleCancel]);

  return (
    <div className="container w-2/3 mx-auto flex flex-col items-center justify-center">
      <Helmet>
        <title>StudyFlow - Admin Dashboard</title>
      </Helmet>

      <div className="flex items-center mt-12 mb-4">
        <h1
          className="cursor-pointer text-3xl font-bold font-primary mr-4"
          onClick={() => handleGoBack()}
        >
          {titleText}
        </h1>
        {selectedBoard && !selectedCard && (
          <EditBoardName
            onSuccess={(updatedName: string) => {
              setSelectedBoard((prevBoard) => {
                if (prevBoard) {
                  return { ...prevBoard, name: updatedName };
                }
                updateTitleText();
                return prevBoard;
              });
            }}
          />
        )}
      </div>

      <>
        {selectedBoard ? (
          <BoardComponent />
        ) : (
          <>
            {isAddingNewBoard ? (
              <CreateBoardComponent handleCancel={handleCancel} />
            ) : (
              <button
                className=" bg-flair font-primary text-secondaryElements px-4 py-2 mb-4 rounded hover:text-white"
                onClick={() => setIsAddingNewBoard(true)}
              >
                Create a new board
              </button>
            )}

            <div className="text-center">
              <ul className="flex flex-row flex-wrap gap-4 justify-center">
                {showBoards.map((board, i) => (
                  <li key={i} className="cursor-pointer">
                    <BoardPreview
                      handleSelectBoard={() => setSelectedBoard(board)}
                      board={board}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default AdminDashboard;
