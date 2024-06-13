import React from "react";
import { Card } from "../types";

interface CardDetailsProps {
	selectedCard: Card;
	handleUpdateSelectedCard: (card: Card) => void;
	handleResetSelectedCard: () => void;
}

const CardDetails: React.FC<CardDetailsProps> = ({
	selectedCard,
	handleUpdateSelectedCard,
	handleResetSelectedCard,
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

	return (
		<div className="p-4 w-1/2 mx-auto bg-secondaryElements shadow-md rounded-lg">
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
				onClick={() => handleResetSelectedCard}
			>
				Close
			</button>
		</div>
	);
};

export default CardDetails;
