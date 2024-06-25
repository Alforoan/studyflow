import React from "react";
import { Card } from "../types";
import useKeyPress from "../hooks/useKeyPress";
import CreateCardComponent from "./CreateCardComponent";

interface CardDetailsProps {
	boardCards: Card[];
	selectedCard: Card;
	handleUpdateSelectedCard: (card: Card) => void;
	handleResetSelectedCard: () => void;
	handlePostNewCard: (newCard: Card) => void;
}

const CardDetails: React.FC<CardDetailsProps> = ({
	boardCards,
	selectedCard,
	handleUpdateSelectedCard,
	handleResetSelectedCard,
	handlePostNewCard,
}) => {
	const toggleCheck = (index: number) => {
		if (!selectedCard || !selectedCard.details.checklist) return;

		const newSelectedCard = {
			...selectedCard,
			details: {
				...selectedCard.details,
				checklist: selectedCard.details.checklist.map((item, idx) =>
					idx === index ? { ...item, checked: !item.checked } : item
				),
			},
		};

		handleUpdateSelectedCard(newSelectedCard);
	};

	// Use custom hook to handle ESC key
	useKeyPress("Escape", handleResetSelectedCard);

	return selectedCard.id === 0 ? (
		<CreateCardComponent
			boardCards={boardCards}
			handlePostNewCard={handlePostNewCard}
			handleResetSelectedCard={handleResetSelectedCard}
		/>
	) : (
		<div className="relative p-4 w-1/2 mx-auto bg-secondaryElements shadow-md rounded-lg">
			<button
				onClick={handleResetSelectedCard}
				style={{ position: "absolute", top: 10, right: 10, cursor: "pointer" }}
				className="text-lg leading-none text-black bg-transparent"
				aria-label="Close Card"
			>
				❌
			</button>
			<h2 className="text-lg font-bold mb-2">{selectedCard.cardName}</h2>
			<ul>
				{selectedCard.details.checklist?.map((item, index) => (
					<li key={index} className="flex items-center mb-2">
						<input
							type="checkbox"
							checked={item.checked}
							onChange={() => toggleCheck(index)}
						/>
						<label className="ml-2" onClick={() => toggleCheck(index)}>
							{item.value}
						</label>
					</li>
				))}
			</ul>
			<p className="mt-4">Notes: {selectedCard.details.notes}</p>
			<p className="mt-1">
				Time Estimate: {selectedCard.details.timeEstimate} Minutes
			</p>
			<p className="mt-1">Column: {selectedCard.column}</p>
			<button
				className="mt-8 py-1.5 px-8 text-sm bg-black text-white rounded"
				onClick={() => handleResetSelectedCard()}
			>
				Close
			</button>
		</div>
	);
};

export default CardDetails;
