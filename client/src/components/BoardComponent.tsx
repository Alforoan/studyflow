import React, { useEffect, useState } from "react";
import { Board, Card, Columns } from "../types";
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
} from "@hello-pangea/dnd";
import CardDetails from "./CardDetails";
import ProgressBar from "./ProgressBar";

interface BoardComponentProps {
	board: Board;
	selectedCard: Card | null;
	handleUpdateCard: (newCard: Card) => void;
	handlePostNewCard: (newCard: Card) => void;
	handleSetSelectedCard: (card: Card | null) => void;
	handleDeleteCard: (cardToDelete: Card) => void;
}

const BoardComponent: React.FC<BoardComponentProps> = ({
	board,
	selectedCard,
	handleUpdateCard,
	handlePostNewCard,
	handleSetSelectedCard,
	handleDeleteCard,
}) => {
	const [estimatedTimeTotal, setEstimatedTimeTotal] = useState(0);
	const [completedTimeTotal, setCompletedTimeTotal] = useState(0);

	useEffect(() => {
		const total =
			board.cards?.reduce(
				(sum, card) => sum + (card.details.timeEstimate || 0),
				0
			) || 0;
		const completed =
			board.cards
				?.filter((card) => card.column === Columns.completed)
				.reduce((sum, card) => sum + (card.details.timeEstimate || 0), 0) || 0;

		setEstimatedTimeTotal(total);
		setCompletedTimeTotal(completed);
	}, [board, handlePostNewCard]);

	const columns = [
		{ title: "Backlog", key: Columns.backlog },
		{ title: "In Progress", key: Columns.inProgress },
		{ title: "Completed", key: Columns.completed },
	];

	// this func should work.. keep an eye out for potential bugs where when you drag and drop cards in destination column card order might get messed up
	function moveCard(cards: Card[], movedCard: Card, destinationIndex: number) {
		// take out the moved card from that column's cards.. sort the column by index.. then splice it into correct spot
		const filteredCards = cards
			.filter((card) => card.id !== movedCard.id)
			.sort((a, b) => a.order - b.order);
		filteredCards.splice(destinationIndex, 0, movedCard);

		filteredCards.forEach((card, index) => {
			card.order = index;
			handleUpdateCard(card);
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

		const movedCard = board.cards!.find(
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
		handleSetSelectedCard(null);
	};

	// both updates the card in the board and updates the selected card
	const handleUpdateSelectedCard = (updatedCard: Card) => {
		handleUpdateCard(updatedCard);
	};

	return (
		<div className="flex flex-col items-start justify-between w-full h-full px-4 py-2">
			{selectedCard ? (
				<CardDetails
					boardCards={board.cards!}
					selectedCard={selectedCard}
					handleUpdateSelectedCard={handleUpdateSelectedCard}
					handleResetSelectedCard={handleResetSelectedCard}
					handlePostNewCard={handlePostNewCard}
					handleDeleteCard={handleDeleteCard}
				/>
			) : (
				<>
					<div className="flex-grow w-full flex">
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
																	onClick={() => handleSetSelectedCard(card)}
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
