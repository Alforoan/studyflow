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

const BoardComponent: React.FC = () => {
  const [estimatedTimeTotal, setEstimatedTimeTotal] = useState(0);
  const [completedTimeTotal, setCompletedTimeTotal] = useState(0);
  const [activeColumn, setActiveColumn] = useState<Columns>(Columns.backlog);

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

    const movedCard = selectedBoard!.cards!.find(
      (card) => card.id.toString() === draggableId
    );
    if (!movedCard) return;

    const cardsInThisColumn = filterCardsByColumn(activeColumn);
    moveCard(cardsInThisColumn, movedCard, destination.index);
  };

  const filterCardsByColumn = (column: Columns | string) => {
    if (typeof column === "string") {
      column = columns.find((col) => col.title === column)!.key;
    }
    let columnCards: Card[] =
      selectedBoard!.cards?.filter((card) => card.column === column) || [];
    return columnCards;
  };

  return (
    <div className="flex flex-col items-start justify-between w-full h-full px-2 py-2">
      {selectedCard ? (
        <CardDetails />
      ) : (
        <>
          {isTemplate ? (
            <div className="flex-grow w-full flex flex-col">
              {columns.map((col) => (
                <div
                  className="w-full p-2 mb-4 bg-secondaryElements rounded-md"
                  key={col.key}
                >
                  <h2 className="text-lg font-primary text-primaryText font-bold mb-2">
                    {col.title}
                  </h2>
                  <div className="flex flex-col flex-grow min-h-[100px]">
                    <ul className="space-y-2">
                      {selectedBoard!
                        .cards!.filter((card) => card.column === col.key)
                        .sort((a, b) => a.order - b.order)
                        .map((card) => (
                          <li
                            key={card.id}
                            className="bg-white p-3 rounded shadow"
                            onClick={() => setSelectedCard(card)}
                          >
                            <h3 className="font-semibold text-lg mb-1">{card.cardName}</h3>
                            {card.details.timeEstimate > 0 && (
                              <p className="text-sm text-gray-600">{card.details.timeEstimate} minutes</p>
                            )}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="w-full mb-4">
                <select
                  className="w-full p-2 bg-secondaryElements text-primaryText rounded-md"
                  value={activeColumn}
                  onChange={(e) => setActiveColumn(e.target.value as Columns)}
                >
                  {columns.map((col) => (
                    <option key={col.key} value={col.key}>
                      {col.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-grow w-full">
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId={activeColumn}>
                    {(provided, _) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex flex-col flex-grow min-h-[100px]"
                      >
                        <ul className="space-y-2">
                          {selectedBoard!
                            .cards!.filter((card) => card.column === activeColumn)
                            .sort((a, b) => a.order - b.order)
                            .map((card, index) => (
                              <Draggable
                                key={card.id}
                                draggableId={card.id.toString()}
                                index={index}
                              >
                                {(provided, _) => (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="bg-white p-3 rounded shadow"
                                    onClick={() => setSelectedCard(card)}
                                  >
                                    <h3 className="font-semibold text-lg mb-1">{card.cardName}</h3>
                                    {card.details.timeEstimate > 0 && (
                                      <p className="text-sm text-gray-600">{card.details.timeEstimate} minutes</p>
                                    )}
                                    {card.details.checklist && card.details.checklist.length > 0 && (
                                      <p className="text-sm text-gray-600 mt-1">
                                        {card.details.checklist.filter((item) => item.checked).length}/
                                        {card.details.checklist.length} complete
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
                </DragDropContext>
              </div>
              <div className="w-full mt-4">
                <ProgressBar
                  estimatedTimeTotal={estimatedTimeTotal}
                  completedTimeTotal={completedTimeTotal}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BoardComponent;
