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
	handleUpdateCard: (newCard: Card, boardId: string) => void;
	handleTitleTextChange: (text: string) => void;
}

const BoardComponent: React.FC<BoardComponentProps> = ({
	board,
	handleUpdateCard,
	handleTitleTextChange,
}) => {
	const [selectedCard, setSelectedCard] = useState<Card | null>(null);
	// thinking about adding a state for each column as a list of cards to simplify things

	useEffect(() => {
		if (selectedCard) {
			handleTitleTextChange(selectedCard.cardName);
		} else {
			handleTitleTextChange(`👈 ${board.boardName}`);
		}
	}, [selectedCard]);

	const columns = [
		{ title: "Backlog", key: Columns.backlog },
		{ title: "In Progress", key: Columns.inProgress },
		{ title: "Completed", key: Columns.completed },
	];

	// this func should work.. keep an eye out for potential bugs where when you drag and drop cards in destination column card order might get messed up
	function moveCard(cards: Card[], movedCard: Card, destinationIndex: number) {
		// take out the moved card from that column's cards.. sort the column by index.. then splice it into correct spot
		const filteredCards = cards
			.filter((card) => card.cardId !== movedCard.cardId)
			.sort((a, b) => a.order - b.order);
		filteredCards.splice(destinationIndex, 0, movedCard);

		filteredCards.forEach((card, index) => {
			card.order = index;
			handleUpdateCard(card, board.boardId);
			// update the order for each card that was moved.. there's got to be a better way to not have to call handleUpdateCard on every card in each column where there was a move done
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

		const movedCard = board.cards!.find((card) => card.cardId === draggableId);
		if (!movedCard) return;

		if (source.droppableId === destination.droppableId) {
			// reorder in the same column
			const cardsInThisColumn = filterCardsByColumn(movedCard.column);
			moveCard(cardsInThisColumn, movedCard, destination.index);
		} else {
			// move to a different column
			const sourceCards = filterCardsByColumn(source.droppableId);
			const destinationCards = filterCardsByColumn(destination.droppableId);

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
			board.cards?.filter((card) => card.column === column) || [];
		return columnCards;
	};

	const handleResetSelectedCard = () => {
		setSelectedCard(null);
	};

	// both updates the card in the board and updates the selected card
	const handleUpdateSelectedCard = (updatedCard: Card) => {
		setSelectedCard(updatedCard);
		handleUpdateCard(updatedCard, board.boardId);
	};

	return (
		<div className="flex items-start justify-between w-full px-4 py-2">
			{selectedCard ? (
				<CardDetails
					selectedCard={selectedCard}
					handleUpdateSelectedCard={handleUpdateSelectedCard}
					handleResetSelectedCard={handleResetSelectedCard}
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
											.map((card) => (
												<Draggable
													key={card.cardId}
													draggableId={card.cardId}
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
															<p>{card.details.timeEstimate} minutes</p>
														</li>
													)}
												</Draggable>
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
