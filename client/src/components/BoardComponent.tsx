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
import { MdOutlineTimer, MdOutlineCheckBox } from "react-icons/md";

const BoardComponent: React.FC = () => {
  const [estimatedTimeTotal, setEstimatedTimeTotal] = useState(0);
  const [completedTimeTotal, setCompletedTimeTotal] = useState(0);

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

  return (
    <div className="flex flex-col items-start justify-between w-full h-full px-4 py-2">
      {selectedCard ? (
        <CardDetails />
      ) : (
        <>
          {isTemplate ? (
            <>
              <div className="flex-grow w-full flex">
                {columns.map((col) => (
                  <div
                    className="w-1/3 p-2 m-4 bg-secondaryElements rounded-md"
                    key={col.key}
                    aria-label={`${col.title} column`}
                  >
                    <h2
                      className="text-lg font-primary text-primaryText font-bold mb-2"
                      aria-label={`${col.title} column title`}
                    >
                      {col.title}
                    </h2>
                    <div className="flex flex-col flex-grow min-h-[100px] ">
                      <ul>
                        {selectedBoard!
                          .cards!.filter((card) => card.column === col.key)
                          .sort((a, b) => a.order - b.order)
                          .map((card) =>
                            card.id === "0" ? (
                              <li
                                key={card.id}
                                aria-label={card.cardName}
                                className="bg-white p-2 mb-2 rounded shadow cursor-pointer"
                                onClick={() => setSelectedCard(card)}
                              >
                                <h3 className="font-semibold">
                                  {card.cardName}
                                </h3>
                                {card.details.timeEstimate &&
                                card.details.timeEstimate > 0 ? (
                                  <p>{card.details.timeEstimate} minutes</p>
                                ) : (
                                  ""
                                )}
                              </li>
                            ) : (
                              <li
                                key={card.id}
                                aria-label={card.cardName}
                                className="bg-white p-2 mb-2 rounded shadow"
                                onClick={() => setSelectedCard(card)}
                              >
                                <h3 className="font-semibold">
                                  {card.cardName}
                                </h3>
                                {card.details.timeEstimate &&
                                card.details.timeEstimate > 0 ? (
                                  <p>{card.details.timeEstimate} minutes</p>
                                ) : (
                                  ""
                                )}
                              </li>
                            )
                          )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
<div className="flex-grow w-full overflow-x-auto">
                <div className="flex min-w-max">
                  <DragDropContext onDragEnd={onDragEnd}>
                    {columns.map((col) => (
                      <div
                        key={col.key}
                        aria-label={`${col.title} column`}
                        className="w-80 p-2 m-4 bg-secondaryElements rounded-md flex-shrink-0"
                      >
                        <h2 className="text-lg font-primary text-primaryText font-bold mb-2">
                          {col.title}
                        </h2>
                        <Droppable key={col.key} droppableId={col.key}>
                          {(provided, _) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className={`flex flex-col flex-grow min-h-[100px] ${
                                col.title === "Backlog" ? "mt-12" : ""
                              }`}
                            >
                              <ul>
                                {selectedBoard!
                                  .cards!.filter(
                                    (card) => card.column === col.key
                                  )
                                  .sort((a, b) => a.order - b.order)
                                  .map((card) =>
                                    card.id === "0" ? (
                                      <li
                                        key={card.id}
                                        aria-label={card.cardName}
                                        className="bg-white p-2 mb-2 rounded shadow cursor-pointer -mt-10"
                                        onClick={() => setSelectedCard(card)}
                                      >
                                        <h3 className="font-semibold">
                                          {card.cardName}
                                        </h3>
                                        {card.details.timeEstimate &&
                                        card.details.timeEstimate > 0 ? (
                                          <p>
                                            {card.details.timeEstimate} minutes
                                          </p>
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
                                            <h3 className="font-semibold text-left">
                                              {card.cardName}
                                            </h3>
                                            {card.details.timeEstimate &&
                                            card.details.timeEstimate > 0 ? (
                                              <p className="flex items-center">
                                                <MdOutlineTimer aria-hidden="true" className="mr-1"/>
                                                {card.details.timeEstimate}{" "}
                                                minutes
                                            </p>
                                          ) : (
                                            ""
                                          )}
                                          {card.details.checklist &&
                                            card.details.checklist.length >
                                              0 && (
                                              <p className="flex items-center">
                                                <MdOutlineCheckBox
                                                  aria-hidden="true"
                                                  className="mr-1"
                                                />
                                                {
                                                  card.details.checklist.filter(
                                                    (item) => item.checked
                                                  ).length
                                                }
                                                /{card.details.checklist.length}{" "}
                                                complete
                                              </p>
                                            ) : (
                                              ""
                                            )}
                                            {card.details.checklist &&
                                              card.details.checklist.length >
                                                0 && (
                                                <p className="flex items-center">
                                                  <MdOutlineCheckBox aria-hidden="true" className="mr-1"/>
                                                  {
                                                    card.details.checklist.filter(
                                                      (item) => item.checked
                                                    ).length
                                                  }
                                                  /{card.details.checklist.length}{" "}
                                                  complete
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
                      </div>
                    ))}
                  </DragDropContext>
                </div>
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
