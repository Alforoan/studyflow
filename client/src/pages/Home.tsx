import React, { useEffect, useCallback, useContext, useState } from "react";
import { Board } from "../types";
import BoardPreview from "../components/BoardPreview";
// import BoardComponent from "../components/BoardComponent";
// import CreateBoardComponent from "../components/CreateBoardComponent";
import { DeleteBoardContext } from "../context/DeleteBoardContext";
import { useAuth } from "../context/AuthContext";
import { useBoard } from "../context/BoardContext";
import { newCard } from "../dummyData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import TemplateSearchBar from "../components/TemplateSearchBar";
// import { useTemplates } from "../context/TemplateContext";
// import SearchGrid from "../components/SearchGrid";
// import DownloadTemplateComponent from "../components/DownloadTemplateComponent";
// import UploadBoardComponent from "../components/UploadBoardComponent";
// import TitleComponent from "../components/TitleComponent";
import { useGetCards, useGetBoards } from "../hooks/useAPI";
import { Helmet } from "react-helmet-async";
// import ButtonComponent, { ButtonStyle } from "../components/ButtonComponent";
// import { IoSearch } from "react-icons/io5";
// import { TbLayoutKanbanFilled } from "react-icons/tb";
import {
  Container,
  Flex,
  Grid,
  GridItem,
  // Heading,
  Input,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
// import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import WelcomeMessage from "../components/WelcomMessage";

const Home: React.FC = () => {
  const {
    selectedBoard,
    setSelectedBoard,
    selectedCard,
    userBoards,
    setUserBoards,
    updateTitleText,
    // isAddingNewBoard,
    setIsAddingNewBoard,
    isToastSuccess,
    searchInput,
    setSearchInput,
    searchedBoards,
    setSearchedBoards,
    // setIsSearching,
    // isSearching,
  } = useBoard();

  const { currentBoards, setCurrentBoards, currentBoardId } =
    useContext(DeleteBoardContext);
  const { token } = useAuth();
  // const { user } = useAuth0();
  const { getBoards } = useGetBoards();
  const { getCards } = useGetCards();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  useEffect(() => {
    console.log("USER BOARDS", currentBoards);
  }, []);

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
          setShowWelcomeMessage(updatedBoards.length === 0);
        }
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };
    if (token) {
      fetchBoards();
      setIsLoading(false);
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
    <Container maxW="5xl" centerContent pb={12}>
      <Helmet>
        <title>StudyFlow - Your Personalized Learning Dashboard</title>
      </Helmet>

      <Flex alignItems="center" mt={8} mb={4}>
        {/* <Heading
          mt={12}
          fontSize={"2xl"}
          fontWeight={600}
          textTransform={"uppercase"}
        >
          Welcome, {user?.given_name ?? user?.nickname}
        </Heading>  ADD HEADING IN HERE */}
      </Flex>

      <Stack w="80%">
        <Flex justify="center" align="center" w="100%" pt={8}>
          <Input
            type="text"
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search your boards..."
            aria-label="Search boards"
            size="md"
            style={{ border: "2px solid #a0aec0" }}
          />
        </Flex>

        {/* Welcome message */}
        <WelcomeMessage
          showWelcomeMessage={showWelcomeMessage}
          setShowWelcomeMessage={setShowWelcomeMessage}
          userBoards={userBoards}
        />

        <Grid
          pb={8}
          templateColumns={{
            base: "repeat(2, 1fr)",
            sm: "repeat(auto-fill, minmax(200px, 1fr))",
          }}
          gap={4}
        >
          {isLoading
            ? Array.from({ length: 12 }).map((_, i) => (
                <GridItem key={i}>
                  <Skeleton height="200px" borderRadius="md" />
                </GridItem>
              ))
            : (searchInput ? searchedBoards : userBoards).map((board, i) => (
                <GridItem key={i} cursor="pointer">
                  <BoardPreview
                    handleSelectBoard={() => {
                      setSelectedBoard(board);
                      navigate("/board");
                    }}
                    board={board}
                  />
                </GridItem>
              ))}
        </Grid>
      </Stack>
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
    </Container>
  );
};

export default Home;
