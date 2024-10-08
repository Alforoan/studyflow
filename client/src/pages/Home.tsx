import React, { useEffect, useContext, useState } from "react";
import { Board } from "../types";
import BoardPreview from "../components/BoardPreview";
import { DeleteBoardContext } from "../context/DeleteBoardContext";
import { useAuth } from "../context/AuthContext";
import { useBoard } from "../context/BoardContext";
import { newCard } from "../dummyData";
import { useGetCards, useGetBoards } from "../hooks/useAPI";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Flex,
  Grid,
  GridItem,
  Input,
  Skeleton,
  Stack,
} from "@chakra-ui/react";

import { useAuth0 } from "@auth0/auth0-react";

import { useNavigate } from "react-router-dom";
// import { useGetBoard } from '../hooks/useAPI';
import WelcomeMessage from "../components/WelcomMessage";

const Home: React.FC = () => {
  const {
    selectedBoard,
    setSelectedBoard,
    selectedCard,
    userBoards,
    setUserBoards,
    updateTitleText,
    searchInput,
    setSearchInput,
    searchedBoards,
    setSearchedBoards,
    toggleCount
  } = useBoard();

  const { currentBoards, setCurrentBoards, currentBoardId } =
    useContext(DeleteBoardContext);
  const { token } = useAuth();

  const { user } = useAuth0();

  const { getBoards } = useGetBoards();
  const { getCards } = useGetCards();
  // const {getBoard } = useGetBoard();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  useEffect(() => {
    const fetchBoards = async () => {
      setIsLoading(true);

      try {

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

      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    if (user && token) {
      fetchBoards(); 
      setIsLoading(false);
    }
  }, [user, token, toggleCount, userBoards.length]);

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

  return (
    <Container maxW="5xl" centerContent pb={12}>
      <Helmet>
        <title>StudyFlow - Your Personalized Learning Dashboard</title>
      </Helmet>

      {/*<Flex alignItems="center" mt={8} mb={4}>
         <Heading
          mt={12}
          fontSize={"2xl"}
          fontWeight={600}
          textTransform={"uppercase"}
        >
          Welcome, {user?.given_name ?? user?.nickname}
        </Heading>  ADD HEADING IN HERE 
      </Flex>*/}

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

        <WelcomeMessage
          showWelcomeMessage={showWelcomeMessage}
          setShowWelcomeMessage={setShowWelcomeMessage}
          userBoards={userBoards}
          isLoading={isLoading}
        />

        <Grid
          pb={8}
          templateColumns={{
            base: "repeat(1, 1fr)",
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
                    handleSelectBoard={async() => {
                      navigate(`/boards/${board?.uuid}`);
                      // const fetchedBoard = await getBoard(board?.uuid, false);
                      setSelectedBoard(board);
                      const fetchedCards = await getCards(board?.uuid, false);
                      fetchedCards!.unshift(newCard);
                      // const updatedBoard = {
                      //   ...fetchedBoard,
                      //   cards: fetchedCards,
                      // };
                      // if(updatedBoard){
                      //   setSelectedBoard(fetchedBoard);
                      // }
                      
                      // if(updatedBoard){
                      //   console.log('UPDATED BOARD HERE NOW ', updatedBoard);
                        
                        
                      // }
                    }}
                    board={board}
                  />
                </GridItem>
              ))}
        </Grid>
      </Stack>
    </Container>
  );
};

export default Home;
