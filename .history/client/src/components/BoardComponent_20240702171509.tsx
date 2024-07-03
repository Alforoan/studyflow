import React, { useEffect, useState } from "react";
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
import { Card, Columns } from "../types";

const BoardComponent: React.FC = () => {
  const [estimatedTimeTotal, setEstimatedTimeTotal] = useState<number>(0);
  const [completedTimeTotal, setCompletedTimeTotal] = useState<number>(0);

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
      const total = selectedBoard.cards?.reduce(
        (sum, card) => sum + (card.details.timeEstimate || 0),
        0
      ) || 0;
      const completed = selectedBoard.cards
        ?.filter((card) => card.column === Columns.completed)
        .reduce((sum, card) => sum + (card.details.timeEstimate || 0), 0) || 0;

      setEstimatedTimeTotal(total);
      setCompletedTimeTotal(completed);
    }
  }, [selectedBoard, handlePostNewCard]);

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

    const movedCard = selectedBoard?.cards?.find(
      (card) => card.id.toString() === draggableId
    );
    if (!movedCard) return;

    if (source.droppableId === destination.droppableId) {
      const cardsInThisColumn = filterCardsByColumn(movedCard.column);
      moveCard(cardsInThisColumn, movedCard, destination.index);
    } else {
      const sourceCards = filterCardsByColumn(source.droppableId);
      const destinationCards = filterCardsByColumn(destination.droppableId);

      if (destination.droppableId === "Backlog" && destination.index === 0) {
        destination.index = 1;
      }

      moveCard(sourceCards, movedCard, sourceCards.length);
      movedCard.column = columns.find(
        (col) => col.title === destination.droppableId
      )!.key;
      moveCard(destinationCards, movedCard, destination.index);
    }
  };

  const filterCardsByColumn = (column: Columns | string) => {
    if (typeof column === "string") {
      column = columns.find((col) => col.title === column)!.key;
    }
    let columnCards: Card[] =
      selectedBoard?.cards?.filter((card) => card.column === column) || [];
    return columnCards;
  };

  return (
    <div className="flex flex-col items-start justify-between w-full h-full px-4 py-2">
      {selectedCard ? (
        <CardDetails />
      ) : (
        <>
          {isTemplate ? (
            <>
              <div className="flex-grow w-full flex flex-col">
                {columns.map((col) => (
                  <div
                    key={col.key}
                    className="p-2 m-2 bg-secondaryElements rounded-md"
                  >
                    <h2 className="text-lg font-bold mb-2">{col.title}</h2>
                    <div className="flex flex-col">
                      <ul className="flex flex-col">
                        {selectedBoard?.cards
                          ?.filter((card) => card.column === col.key)
                          .sort((a, b) => a.order - b.order)
                          .map((card) => (
                            <li
                              key={card.id}
                              className="p-2 mb-2 bg-white rounded shadow cursor-pointer"
                              onClick={() => setSelectedCard(card)}
                            >
                              <h3 className="font-semibold">{card.cardName}</h3>
                              {card.details.timeEstimate && card.details.timeEstimate > 0 && (
                                <p>{card.details.timeEstimate} minutes</p>
                              )}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex-grow w-full">
                <DragDropContext onDragEnd={onDragEnd}>
                  {columns.map((col) => (
                    <div
                      key={col.key}
                      className="p-2 m-2 bg-secondaryElements rounded-md"
                    >
                      <h2 className="text-lg font-bold mb-2">{col.title}</h2>
                      <Droppable droppableId={col.key} key={col.key}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="flex flex-col"
                          >
                            <ul className="flex flex-col">
                              {selectedBoard?.cards
                                ?.filter((card) => card.column === col.key)
                                .sort((a, b) => a.order - b.order)
                                .map((card, index) => (
                                  <Draggable
                                    key={card.id.toString()}
                                    draggableId={card.id.toString()}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="p-2 mb-2 bg-white rounded shadow cursor-pointer"
                                        onClick={() => setSelectedCard(card)}
                                      >
                                        <h3 className="font-semibold">{card.cardName}</h3>
                                        {card.details.timeEstimate && card.details.timeEstimate > 0 && (
                                          <p>{card.details.timeEstimate} minutes</p>
                                        )}
                                        {card.details.checklist &&
                                          card.details.checklist.length > 0 && (
                                            <p>
                                              {card.details.checklist.filter(
                                                (item) => item.checked
                                              ).length}
                                              /{card.details.checklist.length} complete
                                            </p>
                                          )}
                                      </li>
                                    )}
                                  </Draggable>
                                ))}
                              {provided.placeholder}
                            </ul>
                          </div>
                        )}
                      </Droppable>
                    </div>
                  ))}
                </DragDropContext>
              </div>
              <ProgressBar
                estimatedTimeTotal={estimatedTimeTotal}
                completedTimeTotal={completedTimeTotal}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BoardComponent;
