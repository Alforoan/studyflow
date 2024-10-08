import React, { useEffect, useState } from "react";
import { Card, Columns } from "../types";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import CardDetails from "./CardDetails";
import ProgressBar from "./ProgressBar";
import { useBoard } from "../context/BoardContext";
import { useTemplates } from "../context/TemplateContext";
// import { MdOutlineTimer, MdOutlineCheckBox } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { useGetBoard, useGetCards } from '../hooks/useAPI';
import Loading from './Loading';
import {
  // Text,
  Box,
  Heading,
  Flex,
  UnorderedList,
  ListItem,
  Spacer,
} from "@chakra-ui/react";
import { TimeIcon, HamburgerIcon, SmallAddIcon } from "@chakra-ui/icons";
import { newCard } from '../dummyData';

// Define colors for each column
const COLUMN_COLORS: Record<string, string> = {
  [Columns.backlog]: "#FEFCBF", // Light Yellow
  [Columns.inProgress]: "#bee3f8", // Light Blue
  [Columns.completed]: "#C6F6D5", // Light Green
};

const BoardComponent: React.FC = () => {
  // const [noTitleWarning, setNoTitleWarning] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { getBoard } = useGetBoard();
  const { getCards } = useGetCards();
  const [isLoading, setIsLoading] = useState(true);
  console.log("BOARD ID HERE ", id);

  const {
    selectedBoard,
    selectedCard,
    setSelectedCard,
    handleUpdateCard,
    // handlePostNewCard,
    setEstimatedTimeTotal,
    setCompletedTimeTotal,
    setSelectedBoard,
    estimatedTimeTotal,
    completedTimeTotal,
    calculateCompletedTime,
    calculateTotalTime
    // isLoading,
    // setIsLoading

  } = useBoard();

  const { isTemplate } = useTemplates();

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        setIsLoading(true);
        if (id && (!selectedBoard || selectedBoard.uuid !== id)) {
          const fetchedBoard = await getBoard(id, false);
          if (fetchedBoard) {
            const fetchedCards = await getCards(id, false);
            fetchedCards!.unshift(newCard);
            const updatedBoard = { ...fetchedBoard, cards: fetchedCards };
            const total =
              calculateTotalTime(updatedBoard);
            const completedTime = calculateCompletedTime(updatedBoard);

            setEstimatedTimeTotal(total);
            setCompletedTimeTotal(
              completedTime
            );

            setSelectedBoard(updatedBoard);
          }
        }
      } catch (error) {
        console.error("Error fetching board and cards:", error);
      } finally {
        setIsLoading(false); // Stop loading after fetching data
      }
    };

    fetchBoard();
  }, [id, estimatedTimeTotal, completedTimeTotal, selectedCard]);

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }


  const columns = [
    { title: "Backlog", key: Columns.backlog },
    { title: "In Progress", key: Columns.inProgress },
    { title: "Completed", key: Columns.completed },
  ];

  function moveCard(cards: Card[], movedCard: Card, destinationIndex: number) {
    const filteredCards = cards
      .filter((card) => card.id !== movedCard.id)
      .sort((a, b) => a.order - b.order);
    filteredCards.splice(destinationIndex, 0, movedCard);

    filteredCards.forEach((card, index) => {
      card.order = index;
      handleUpdateCard(card, isTemplate);
    });
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    const movedCard = selectedBoard!.cards!.find(
      (card) => card.id.toString() === draggableId
    );
    if (!movedCard) return;

    if (source.droppableId === destination.droppableId) {
      // reorder in the same column
      const cardsInThisColumn = filterCardsByColumn(movedCard.column);
      moveCard(cardsInThisColumn, movedCard, destination.index);
    } else {
      // move to a different column
      const sourceCards = filterCardsByColumn(source.droppableId);
      const destinationCards = filterCardsByColumn(destination.droppableId);

      // Prevent moving any card to the position before the `newCard`
      if (destination.droppableId === "Backlog" && destination.index === 0) {
        console.log("Cannot move above the new card placeholder.");
        destination.index = 1;
        return;
      }

      moveCard(sourceCards, movedCard, sourceCards.length); // just call this to remove it from the source cards it automatically filters it out
      movedCard.column = columns.find(
        (col) => col.title === destination.droppableId
      )!.key;
      moveCard(destinationCards, movedCard, destination.index); // Add to destination
    }
    if(destination.droppableId === "Completed"){
      const totalTime = calculateTotalTime(selectedBoard!);
      const completedTime = calculateCompletedTime(selectedBoard!);
      setEstimatedTimeTotal(totalTime);
      setCompletedTimeTotal(completedTime);
    }
    if (destination.droppableId === "In Progress") {
      const totalTime = calculateTotalTime(selectedBoard!);
      const completedTime = calculateCompletedTime(selectedBoard!);
      setEstimatedTimeTotal(totalTime);
      setCompletedTimeTotal(completedTime);
    }
  };

  // helper func to grab all cards for a specific column enum
  const filterCardsByColumn = (column: Columns | string) => {
    if (typeof column === "string") {
      column = columns.find((col) => col.title === column)!.key;
    }
    let columnCards: Card[] =
      selectedBoard!.cards?.filter((card) => card.column === column) || [];
    return columnCards;
  };

  const minConverter = (minutes: number): String => {
    let output: String = "";
    const hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;

    if (hours > 0) output += `${hours}h`;
    if (remainingMinutes > 0) output += ` ${remainingMinutes}m`;

    return output;
  };

  const swapTop = (arr: Card[]): Card[] => {
    let top = arr.shift();
    arr.push(top!);
    return arr;
  };

  if (!selectedBoard || !selectedBoard.cards) {
    return <div>No cards available</div>;
  }
  
  

  return (
    <Flex direction="column">
      {selectedCard ? (
        <CardDetails />
      ) : (
        <>
          {isTemplate ? (
            <Box w="100%" overflowX={{ base: "auto", md: "hidden" }} mb="4">
              <Flex
                flexGrow={1}
                gap={4}
                w="full"
                minW={{ base: "900px", md: "100%" }}
                overflowX="auto"
              >
                {columns.map((col) => (
                  <Box
                    w="100%"
                    p={2}
                    bg="gray.100"
                    borderRadius="md"
                    key={col.key}
                    aria-label={`${col.title} column`}
                    color="blackAlpha.900"
                  >
                    <Heading
                      size="md"
                      fontWeight="bold"
                      mb={2}
                      aria-label={`${col.title} column title`}
                      color="blackAlpha.900"
                      fontSize="md"
                      py={2}
                      px={4}
                    >
                      {col.title}
                    </Heading>
                    <Flex direction="column" flexGrow={1}>
                      <UnorderedList styleType="none" m={0} p={0}>
                        {(() => {
                          let cards = selectedBoard!
                            .cards!.filter((card) => card.column === col.key)
                            .sort((a, b) => a.order - b.order);
                          if (col.title === "Backlog") {
                            cards = swapTop(cards);
                          }

                          return cards.map((card) =>
                            card.id === "0" ? (
                              <ListItem
                                key={card.id}
                                aria-label={card.cardName}
                                bg="gray.100"
                                py={2}
                                px={4}
                                _hover={{ bg: "gray.200" }}
                                cursor="pointer"
                                rounded="md"
                                onClick={() => setSelectedCard(card)}
                              >
                                <Heading
                                  fontSize="md"
                                  mb={0}
                                  fontWeight="500"
                                  alignItems={"center"}
                                >
                                  <SmallAddIcon mr={2} />
                                  {card.cardName}
                                </Heading>
                              </ListItem>
                            ) : (
                              <ListItem
                                bg={COLUMN_COLORS[col.key]}
                                pt={3}
                                pb={2}
                                px={4}
                                mb={2}
                                borderRadius="md"
                                shadow="sm"
                                cursor="pointer"
                                onClick={() => setSelectedCard(card)}
                                key={card.id}
                              >
                                <Heading
                                  fontSize="md"
                                  mb={1}
                                  fontWeight="semibold"
                                >
                                  {card.cardName}
                                </Heading>
                                {card.details.timeEstimate &&
                                  card.details.timeEstimate > 0 && (
                                    <Flex
                                      fontSize="sm"
                                      fontWeight={500}
                                      alignItems="center"
                                      mb={0}
                                    >
                                      <HamburgerIcon mr={2} />
                                      {card.details.checklist?.length}
                                      <Spacer />
                                      {minConverter(card.details.timeEstimate)}
                                      <TimeIcon ml={2} />
                                    </Flex>
                                  )}
                              </ListItem>
                            )
                          );
                        })()}
                      </UnorderedList>
                    </Flex>
                  </Box>
                ))}
              </Flex>
            </Box>
          ) : (
            <Box
              w="100%"
              overflowX={{ base: "auto", md: "hidden" }}
              mb="4"
              color="blackAlpha.900"
            >
              <Flex
                flexGrow={1}
                gap={4}
                w="full"
                minW={{ base: "900px", md: "100%" }}
                overflowX="auto"
              >
                <DragDropContext onDragEnd={onDragEnd}>
                  {columns.map((col) => (
                    <Box
                      w="100%"
                      p={2}
                      bg="gray.100"
                      borderRadius="md"
                      key={col.key}
                      aria-label={`${col.title} column`}
                    >
                      <Heading
                        size="md"
                        fontWeight="bold"
                        mb={2}
                        aria-label={`${col.title} column title`}
                        color="blackAlpha.900"
                        fontSize="md"
                        py={2}
                        px={4}
                      >
                        {col.title}
                      </Heading>
                      <Droppable droppableId={col.key}>
                        {(provided, snapshot) => (
                          <Flex
                            direction="column"
                            flexGrow={1}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            bg={
                              snapshot.isDraggingOver
                                ? "gray.200"
                                : "transparent"
                            }
                            rounded={"md"}
                            p="2"
                          >
                            <UnorderedList styleType="none" m={0} p={0}>
                              {(() => {
                                let cards = selectedBoard!
                                  .cards!.filter(
                                    (card) => card.column === col.key
                                  )
                                  .sort((a, b) => {
                                    if (a.cardName === "Create New Card")
                                      return -1;
                                    if (b.cardName === "Create New Card")
                                      return 1;
                                    return a.order - b.order;
                                  });
                                // if (col.title === "Backlog") {
                                //   cards = swapTop(cards);
                                // }

                                // if (cards && cards.length > 0) {
                                //   const validCards = cards.filter(
                                //     (card) => card !== undefined
                                //   );
                                  
                                  return cards.map((card, index) =>
                                    card.id === "0" ? (
                                      <ListItem
                                        key={card.id}
                                        aria-label={card.cardName}
                                        bg="gray.100"
                                        py={2}
                                        px={4}
                                        _hover={{ bg: "gray.200" }}
                                        cursor="pointer"
                                        rounded="md"
                                        onClick={() => setSelectedCard(card)}
                                      >
                                        <Heading
                                          fontSize="md"
                                          mb={0}
                                          fontWeight="500"
                                          alignItems={"center"}
                                        >
                                          <SmallAddIcon mr={2} />
                                          {card.cardName}
                                        </Heading>
                                      </ListItem>
                                    ) : (
                                      <Draggable
                                        key={card.id}
                                        draggableId={card.id.toString()}
                                        index={index}
                                      >
                                        {(provided, snapshot) => (
                                          <ListItem
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            bg={COLUMN_COLORS[col.key]}
                                            pt={3}
                                            pb={2}
                                            px={4}
                                            mb={2}
                                            borderRadius="md"
                                            shadow="sm"
                                            cursor="pointer"
                                            onClick={() =>
                                              setSelectedCard(card)
                                            }
                                            style={{
                                              ...provided.draggableProps.style,
                                              backgroundColor:
                                                snapshot.isDragging
                                                  ? "gray.50"
                                                  : COLUMN_COLORS[card.column],
                                            }}
                                          >
                                            <Heading
                                              fontSize="md"
                                              mb={1}
                                              fontWeight="semibold"
                                            >
                                              {card.cardName}
                                            </Heading>
                                            {card.details.timeEstimate &&
                                              card.details.timeEstimate > 0 && (
                                                <Flex
                                                  fontSize="sm"
                                                  fontWeight={500}
                                                  alignItems="center"
                                                  mb={0}
                                                >
                                                  <HamburgerIcon mr={2} />
                                                  {
                                                    card.details.checklist
                                                      ?.length
                                                  }
                                                  <Spacer />
                                                  {minConverter(
                                                    card.details.timeEstimate
                                                  )}
                                                  <TimeIcon ml={2} />
                                                </Flex>
                                              )}
                                          </ListItem>
                                        )}
                                      </Draggable>
                                    )
                                  );
                                // }
                                
                              })()}
                              {provided.placeholder}
                            </UnorderedList>
                          </Flex>
                        )}
                      </Droppable>
                    </Box>
                  ))}
                </DragDropContext>
              </Flex>
              <ProgressBar />
            </Box>
          )}
        </>
      )}
    </Flex>
  );
};

export default BoardComponent;
