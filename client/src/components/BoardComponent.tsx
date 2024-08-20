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

import {
  Text,
  Box,
  Heading,
  Flex,
  UnorderedList,
  ListItem,
  Spacer,
} from "@chakra-ui/react";
import { TimeIcon, HamburgerIcon, SmallAddIcon } from "@chakra-ui/icons";

// Define colors for each column
const COLUMN_COLORS: Record<string, string> = {
  [Columns.backlog]: "#FEFCBF", // Light Yellow
  [Columns.inProgress]: "#bee3f8", // Light Blue
  [Columns.completed]: "#C6F6D5", // Light Green
};

const BoardComponent: React.FC = () => {
  const [estimatedTimeTotal, setEstimatedTimeTotal] = useState(0);
  const [completedTimeTotal, setCompletedTimeTotal] = useState(0);

  const [noTitleWarning, setNoTitleWarning] = useState(false);

  const {
    selectedBoard,
    selectedCard,
    setSelectedCard,
    handleUpdateCard,
    handlePostNewCard,
  } = useBoard();

  const { isTemplate } = useTemplates();

  useEffect(() => {
    if (selectedBoard) {
      const total =
        selectedBoard.cards?.reduce(
          (sum, card) => sum + (card.details.timeEstimate || 0),
          0
        ) || 0;
      const completed =
        selectedBoard.cards
          ?.filter((card) => card.column === Columns.completed)
          .reduce((sum, card) => sum + (card.details.timeEstimate || 0), 0) ||
        0;

      setEstimatedTimeTotal(total);
      setCompletedTimeTotal(completed);
    }
  }, [selectedBoard!, handlePostNewCard]);

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
      }

      moveCard(sourceCards, movedCard, sourceCards.length); // just call this to remove it from the source cards it automatically filters it out
      movedCard.column = columns.find(
        (col) => col.title === destination.droppableId
      )!.key;
      moveCard(destinationCards, movedCard, destination.index); // Add to destination
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

  if (!selectedBoard) {
    return (
      <>
        {noTitleWarning && (
          <Text color="red.400" mb={4}>
            You must add a board title first!
          </Text>
        )}
        <Box w="100%" overflowX={{ base: "auto", md: "hidden" }}>
          <Flex
            flexGrow={1}
            gap={4}
            w="full"
            minW={{ base: "900px", md: "100%" }}
            overflowX="auto"
          >
            {columns.map((col) => (
              <Box
                w={{ base: "300px", md: "100%" }}
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
                <Flex direction="column" flexGrow={1}>
                  {col.title === "Backlog" && (
                    <Box
                      aria-label={"Create Card"}
                      bg="gray.100"
                      py={2}
                      px={4}
                      _hover={{ bg: "gray.200" }}
                      cursor="pointer"
                      rounded="md"
                      onClick={() => setNoTitleWarning(true)}
                    >
                      <Heading
                        fontSize="md"
                        mb={0}
                        fontWeight="500"
                        alignItems={"center"}
                        color="gray.600"
                      >
                        <SmallAddIcon mr={2} />
                        Create New Card
                      </Heading>
                    </Box>
                  )}
                </Flex>
              </Box>
            ))}
          </Flex>
        </Box>
      </>
    );
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
            <Box w="100%" overflowX={{ base: "auto", md: "hidden" }} mb="4" color="blackAlpha.900">
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
                                  .sort((a, b) => a.order - b.order);
                                if (col.title === "Backlog") {
                                  cards = swapTop(cards);
                                }

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
                                          onClick={() => setSelectedCard(card)}
                                          style={{
                                            ...provided.draggableProps.style,
                                            backgroundColor: snapshot.isDragging
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
                                                {card.details.checklist?.length}
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
              <ProgressBar
                estimatedTimeTotal={estimatedTimeTotal}
                completedTimeTotal={completedTimeTotal}
              />
            </Box>
          )}
        </>
      )}
    </Flex>
  );
};

export default BoardComponent;
