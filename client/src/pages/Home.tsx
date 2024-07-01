import React, { useEffect, useCallback, useContext } from "react";
import { Board } from "../types";
import BoardPreview from "../components/BoardPreview";
import BoardComponent from "../components/BoardComponent";
import CreateBoardComponent from "../components/CreateBoardComponent";
import useGetUserBoards from "../hooks/useGetUserBoards";
import EditBoardName from "../components/EditBoardName";
import useGetCards from "../hooks/useGetCards";
import { DeleteBoardContext } from "../context/DeleteBoardContext";
import { useAuth } from "../context/AuthContext";
import { useBoard } from "../context/BoardContext";
import { newCard } from "../dummyData";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home: React.FC = () => {
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

  const { currentBoards, setCurrentBoards, currentBoardId } =
    useContext(DeleteBoardContext);
  const { token } = useAuth();

  const { getUserBoards } = useGetUserBoards();
  const { getCardsFromBoard } = useGetCards();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        if (userBoards.length === 0) {
          console.log("Fetching user's boards from the API");

          const boardsFromAPI = await getUserBoards();
          console.log(`Got ${boardsFromAPI.length} boards from the API`);
          console.log(boardsFromAPI);

          const updatedBoards = await Promise.all(
            boardsFromAPI.map(async (board) => {
              const cardsFromAPI = await getCardsFromBoard(board.uuid);
              const updatedCards = [...cardsFromAPI, newCard];
              return { ...board, cards: updatedCards };
            })
          );
          setCurrentBoards(updatedBoards);
          setUserBoards(updatedBoards);
        }
      } catch (error) {
        console.error("Error fetching boards:", error);
        toast.error('Failed to fetch boards. Please try again.');
      }
    };
    if (token) {
      fetchBoards();
    }
  }, [token]);

  useEffect(() => {
    const filteredBoards = userBoards.filter(
      (board) => board.uuid !== currentBoardId
    );
    setUserBoards(filteredBoards);
    if (currentBoardId) {
      toast.success('Board deleted successfully!');
    }
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

  const handleCreateBoard = (newBoard: Board) => {
    setUserBoards([...userBoards, newBoard]);
    setIsAddingNewBoard(false);
    toast.success('Board created successfully!');
  };

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
      <div className="flex items-center mt-12 mb-4">
        <h1
          className="cursor-pointer text-3xl font-bold font-primary mr-4"
          onClick={() => handleGoBack()}
        >
          {tileText}
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
              toast.success('Board name updated successfully!');
            }}
          />
        )}
      </div>

      {!selectedBoard && !selectedCard && !isAddingNewBoard && (
        <button
          className=" bg-secondaryElements font-primary text-flair px-4 py-2 mb-4 rounded hover:bg-flair hover:text-secondaryElements"
          onClick={() => populateDummyData()}
        >
          Populate Dummy Data
        </button>
      )}

      <>
        {selectedBoard ? (
          <BoardComponent />
        ) : (
          <>
            {isAddingNewBoard ? (
              <CreateBoardComponent handleCancel={handleCancel} onCreateBoard={handleCreateBoard} />
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
                {userBoards.map((board, i) => (
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
      <ToastContainer />
    </div>
  );
};

export default Home;