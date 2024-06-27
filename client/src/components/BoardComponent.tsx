import React, { useEffect, useState } from "react";
import { Board, Card, Columns } from "../types";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import CardDetails from "./CardDetails";

interface BoardComponentProps {
  board: Board;
  handleUpdateCard: (newCard: Card) => void;
  handleTitleTextChange: (text: string) => void;
  handlePostNewCard: (newCard: Card) => void;
  handleSetIsCardSelected: (isSelected: boolean) => void;
}

const BoardComponent: React.FC<BoardComponentProps> = ({
  board,
  handleUpdateCard,
  handleTitleTextChange,
  handlePostNewCard,
  handleSetIsCardSelected,
}) => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  useEffect(() => {
    if (selectedCard) {
      handleTitleTextChange(selectedCard.cardName);
      handleSetIsCardSelected(true);
    } else {
      handleTitleTextChange(`👈 ${board.name}`);
      handleSetIsCardSelected(false);
    }
  }, [selectedCard]);

  const columns = [
    { title: "Backlog", key: Columns.backlog },
    { title: "In Progress", key: Columns.inProgress },
    { title: "Completed", key: Columns.completed },
  ];

  function moveCard(cards: Card[], movedCard: Card, destinationIndex: number, columnKey: Columns) {
    const filteredCards = cards
      .filter((card) => card.id !== movedCard.id)
      .sort((a, b) => a.order - b.order);
    
    // Ensure the card is not placed at index 0 only for the Backlog column
    const insertIndex = columnKey === Columns.backlog ? Math.max(1, destinationIndex) : destinationIndex;
    filteredCards.splice(insertIndex, 0, movedCard);

    filteredCards.forEach((card, index) => {
      if (columnKey === Columns.backlog && index === 0) return; // Skip updating the first card in Backlog
      card.order = index;
      handleUpdateCard(card);
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

    const movedCard = board.cards!.find(
      (card) => card.id.toString() === draggableId
    );
    if (!movedCard) return;

    // Prevent moving to index 0 only in the Backlog column
    if (destination.droppableId === Columns.backlog && destination.index === 0) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const cardsInThisColumn = filterCardsByColumn(movedCard.column);
      moveCard(cardsInThisColumn, movedCard, destination.index, movedCard.column);
    } else {
      const sourceCards = filterCardsByColumn(source.droppableId);
      const destinationCards = filterCardsByColumn(destination.droppableId);

      moveCard(sourceCards, movedCard, sourceCards.length, movedCard.column);
      movedCard.column = columns.find(
        (col) => col.title === destination.droppableId
      )!.key;
      moveCard(destinationCards, movedCard, destination.index, movedCard.column);
    }
  };

  const filterCardsByColumn = (column: Columns | string) => {
    if (typeof column === "string") {
      column = columns.find((col) => col.title === column)!.key;
    }
    let columnCards: Card[] =
      board.cards?.filter((card) => card.column === column) || [];
    return columnCards;
  };

  const handleResetSelectedCard = () => {
    setSelectedCard(null);
  };

  const handleUpdateSelectedCard = (updatedCard: Card) => {
    setSelectedCard(updatedCard);
    handleUpdateCard(updatedCard);
    console.log("We gotta update the board now!!!");
  };

  return (
    <div className="flex items-start justify-between w-full px-4 py-2">
      {selectedCard ? (
        <CardDetails
          boardCards={board.cards!}
          selectedCard={selectedCard}
          handleUpdateSelectedCard={handleUpdateSelectedCard}
          handleResetSelectedCard={handleResetSelectedCard}
          handlePostNewCard={handlePostNewCard}
        />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map((col) => (
            <Droppable key={col.key} droppableId={col.key}>
              {(provided, _) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-1/3 p-2 m-4 bg-secondaryElements rounded-md"
                >
                  <h2 className="text-lg font-primary text-primaryText font-bold mb-2">
                    {col.title}
                  </h2>
                  <ul>
                    {board
                      .cards!.filter((card) => card.column === col.key)
                      .sort((a, b) => a.order - b.order)
                      .map((card, index) => (
                        col.key === Columns.backlog && index === 0 ? (
                          <li
                            key={card.id}
                            className="bg-white p-2 mb-2 rounded shadow"
                            onClick={() => setSelectedCard(card)}
                          >
                            <h3 className="font-semibold">{card.cardName}</h3>
                            {card.details.timeEstimate && card.details.timeEstimate > 0 ? (
                              <p>{card.details.timeEstimate} minutes</p>
                            ) : (
                              ""
                            )}
                          </li>
                        ) : (
                          <Draggable
                            key={card.id}
                            draggableId={card.id.toString()}
                            index={card.order}
                          >
                            {(provided, _) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-white p-2 mb-2 rounded shadow"
                                onClick={() => setSelectedCard(card)}
                              >
                                <h3 className="font-semibold">{card.cardName}</h3>
                                {card.details.timeEstimate && card.details.timeEstimate > 0 ? (
                                  <p>{card.details.timeEstimate} minutes</p>
                                ) : (
                                  ""
                                )}
                              </li>
                            )}
                          </Draggable>
                        )
                      ))}
                    {provided.placeholder}
                  </ul>
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      )}
    </div>
  );
};

export default BoardComponent;