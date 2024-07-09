import React, { useEffect, useCallback, useContext } from "react";
import { Board } from "../types";
import BoardPreview from "../components/BoardPreview";
import BoardComponent from "../components/BoardComponent";
import CreateBoardComponent from "../components/CreateBoardComponent";
import { DeleteBoardContext } from "../context/DeleteBoardContext";
import { useAuth } from "../context/AuthContext";
import { useBoard } from "../context/BoardContext";
import { newCard } from "../dummyData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TemplateSearchBar from "../components/TemplateSearchBar";
import { useTemplates } from "../context/TemplateContext";
import SearchGrid from "../components/SearchGrid";
import DownloadTemplateComponent from "../components/DownloadTemplateComponent";
import UploadBoardComponent from "../components/UploadBoardComponent";
import TitleComponent from "../components/TitleComponent";
import { useGetCards, useGetBoards } from "../hooks/useAPI";
import { Helmet } from "react-helmet-async";
import ButtonComponent, { ButtonStyle } from "../components/ButtonComponent";
import { IoSearch } from "react-icons/io5";
import { TbLayoutKanbanFilled } from "react-icons/tb";

const Home: React.FC = () => {
  const {
    selectedBoard,
    setSelectedBoard,
    selectedCard,
    userBoards,
    setUserBoards,
    updateTitleText,
    isAddingNewBoard,
    setIsAddingNewBoard,
    isToastSuccess,
    searchInput,
    setSearchInput,
    searchedBoards,
    setSearchedBoards,
    setIsSearching,
    isSearching,
  } = useBoard();

  const { currentBoards, setCurrentBoards, currentBoardId } =
    useContext(DeleteBoardContext);
  const { token } = useAuth();

  const { getBoards } = useGetBoards();
  const { getCards } = useGetCards();

  const { isTemplate, uploadedTemplateNames } = useTemplates();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        if (userBoards.length === 0) {
          const boardsFromAPI = await getBoards(false);

          const updatedBoards = await Promise.all(
            boardsFromAPI.map(async (board) => {
              const cardsFromAPI = await getCards(board.uuid, false);
              const updatedCards = [...cardsFromAPI, newCard];
              return { ...board, cards: updatedCards };
            })
          );
          setCurrentBoards(updatedBoards);
          setUserBoards(updatedBoards);
          setSearchedBoards(updatedBoards);
        }
      } catch (error) {
        console.error("Error fetching boards:", error);
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
  }, [currentBoards]);

  useEffect(() => {
    if (selectedBoard) {
      console.log(selectedBoard);
      updateTitleText();

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

  const handleCancel = useCallback(() => {
    setIsAddingNewBoard(false);
  }, []);

  useEffect(() => {
    const originalBoards = userBoards;
    let filteredBoards = userBoards;
    if (searchInput) {
      filteredBoards = userBoards.filter((board) =>
        board.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSearchedBoards(filteredBoards);
    } else {
      setSearchedBoards(originalBoards);
    }
  }, [searchInput]);

  useEffect(() => {
    if (isToastSuccess.toLowerCase().includes("error")) {
      toast.error(isToastSuccess, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (isToastSuccess.length > 0) {
      toast.success(isToastSuccess, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [isToastSuccess]);

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
    <div className="container w-2/3 mx-auto flex flex-col items-center justify-center pb-12">
      <Helmet>
        <title>StudyFlow - Your Personalized Learning Dashboard</title>
      </Helmet>

      <div className="flex items-center mt-12 mb-4">
        <TitleComponent />

        {selectedBoard && !selectedCard && isTemplate && (
          <DownloadTemplateComponent />
        )}
      </div>
      {selectedBoard &&
        !selectedCard &&
        !isTemplate &&
        !uploadedTemplateNames.includes(selectedBoard!.name) &&
        selectedBoard.cards?.length &&
        selectedBoard.cards.length > 1 && <UploadBoardComponent />}
      {!selectedBoard && !selectedCard && !isAddingNewBoard && (
        <>
          {!isSearching && (
            <ButtonComponent
              click={() => setIsSearching(true)}
              text={"Search Templates"}
              buttonType={ButtonStyle.OuterSecondary}
              additionalStyles={"mb-4 mt-4 w-1/5"}
              icon={<IoSearch />}
            />
          )}
        </>
      )}

      <>
        {selectedBoard ? (
          <BoardComponent />
        ) : (
          <>
            {!isSearching ? (
              <>
                {isAddingNewBoard ? (
                  <CreateBoardComponent handleCancel={handleCancel} />
                ) : (
                  <>
                    <ButtonComponent
                      click={() => setIsAddingNewBoard(true)}
                      text={"Create New Board"}
                      buttonType={ButtonStyle.OuterPrimary}
                      additionalStyles={"mb-4 w-1/5"}
                      icon={<TbLayoutKanbanFilled />}
                    />
                    <div className="mb-4 w-full">
                      <input
                        type="text"
                        id="searchInput"
                        placeholder="Search For Boards"
                        className="mt-1 block mx-auto w-1/5 px-3 py-2 border border-gray-300 bg-white rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                    </div>
                  </>
                )}

                <div className="text-center">
                  <ul className="flex flex-row flex-wrap gap-4 justify-center pt-8">
                    {searchInput
                      ? searchedBoards.map((board, i) => (
                          <li key={i} className="cursor-pointer">
                            <BoardPreview
                              handleSelectBoard={() => setSelectedBoard(board)}
                              board={board}
                            />
                          </li>
                        ))
                      : userBoards.map((board, i) => (
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
            ) : (
              <>
                <TemplateSearchBar />
                <SearchGrid />
              </>
            )}
          </>
        )}
      </>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Home;
