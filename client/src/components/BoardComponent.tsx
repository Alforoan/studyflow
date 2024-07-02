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
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const BoardComponent: React.FC = () => {
  const [estimatedTimeTotal, setEstimatedTimeTotal] = useState(0);
  const [completedTimeTotal, setCompletedTimeTotal] = useState(0);
  const [expandedColumn, setExpandedColumn] = useState<string | null>(null);

  const {
    selectedBoard,
    selectedCard,
    setSelectedCard,
    handleUpdateCard,
    handlePostNewCard,
  } = useBoard();

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

    if (source.droppableId === destination.droppableId) {
      const cardsInThisColumn = filterCardsByColumn(movedCard.column);
      moveCard(cardsInThisColumn, movedCard, destination.index);
    } else {
      const sourceCards = filterCardsByColumn(source.droppableId);
      const destinationCards = filterCardsByColumn(destination.droppableId);

      if (destination.droppableId === "Backlog" && destination.index === 0) {
        console.log("Cannot move above the new card placeholder.");
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
      selectedBoard!.cards?.filter((card) => card.column === column) || [];
    return columnCards;
  };

  const toggleColumn = (columnKey: string) => {
    setExpandedColumn(expandedColumn === columnKey ? null : columnKey);
  };

  return (
    <div className="flex flex-col items-start justify-between w-full h-full px-2 py-2 md:px-4">
      {selectedCard ? (
        <CardDetails />
      ) : (
        <>
          <div className="flex-grow w-full flex flex-col md:flex-row">
            <DragDropContext onDragEnd={onDragEnd}>
              {columns.map((col) => (
                <div key={col.key} className="w-full md:w-1/3 p-2 mb-4 md:m-4 bg-secondaryElements rounded-md">
                  <div 
                    className="flex justify-between items-center cursor-pointer p-2"
                    onClick={() => toggleColumn(col.key)}
                  >
                    <h2 className="text-lg font-primary text-primaryText font-bold">
                      {col.title}
                    </h2>
                    {expandedColumn === col.key ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
                  </div>
                  {(expandedColumn === col.key || window.innerWidth >= 768) && (
                    <Droppable key={col.key} droppableId={col.key}>
                      {(provided, _) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`flex flex-col flex-grow min-h-[100px] ${
                            col.title === "Backlog" ? "mt-12" : ""
                          }`}
                        >
                          <ul className="space-y-2">
                            {selectedBoard!
                              .cards!.filter((card) => card.column === col.key)
                              .sort((a, b) => a.order - b.order)
                              .map((card) =>
                                card.id === "0" ? (
                                  <li
                                    key={card.id}
                                    className="bg-white p-3 rounded shadow cursor-pointer -mt-10"
                                    onClick={() => setSelectedCard(card)}
                                  >
                                    <h3 className="font-semibold">
                                      {card.cardName}
                                    </h3>
                                    {card.details.timeEstimate &&
                                    card.details.timeEstimate > 0 ? (
                                      <p className="text-sm text-gray-600">{card.details.timeEstimate} minutes</p>
                                    ) : null}
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
                                        className="bg-white p-3 rounded shadow"
                                        onClick={() => setSelectedCard(card)}
                                      >
                                        <h3 className="font-semibold">
                                          {card.cardName}
                                        </h3>
                                        {card.details.timeEstimate &&
                                        card.details.timeEstimate > 0 ? (
                                          <p className="text-sm text-gray-600">
                                            {card.details.timeEstimate} minutes
                                          </p>
                                        ) : null}
                                        {card.details.checklist && card.details.checklist.length > 0 && (
                                        <p className="text-sm text-gray-600 mt-1">
                                          {card.details.checklist.filter((item) => item.checked).length}/{card.details.checklist.length} complete
                                        </p>
                                        )}
                                      </li>
                                    )}
                                  </Draggable>
                                )
                              )}
                            {provided.placeholder}
                          </ul>
                        </div>
                      )}
                    </Droppable>
                  )}
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
    </div>
  );
};

export default BoardComponent;