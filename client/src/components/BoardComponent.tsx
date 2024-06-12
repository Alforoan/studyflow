import React, { useState } from "react";
import { Board, Card, ChecklistEntry, Columns } from "../types";

interface BoardComponentProps {
	board: Board;
}

const BoardComponent: React.FC<BoardComponentProps> = ({ board }) => {
	const [selectedCard, setSelectedCard] = useState<Card | null>(null);

	const columns = [
		{ title: "Backlog", key: Columns.backlog },
		{ title: "In Progress", key: Columns.inProgress },
		{ title: "Completed", key: Columns.completed },
	];

	const filterCardsByColumn = (column: Columns) => {
		let columnCards: Card[] =
			board.cards?.filter((card) => card.column === column) || [];
		return columnCards;
	};

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

		setSelectedCard(newSelectedCard);
	};

	return (
		<div className="flex justify-between w-full px-4 py-2">
			{selectedCard ? (
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
						onClick={() => setSelectedCard(null)}
					>
						Close
					</button>
				</div>
			) : (
				<>
					{columns.map((col) => (
						<div
							key={col.key}
							className="w-1/3 p-2 m-4 bg-secondaryElements rounded-md"
						>
							<h2 className="text-lg font-primary text-primaryText font-bold mb-2">
								{col.title}
							</h2>
							<ul>
								{filterCardsByColumn(col.key).map((card: Card) => (
									<li
										key={card.cardId}
										className="bg-white p-2 mb-2 rounded shadow"
										onClick={() => setSelectedCard(card)}
									>
										<h3 className="font-semibold">{card.cardName}</h3>
										<p>{card.details.timeEstimate} minutes</p>
									</li>
								))}
							</ul>
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default BoardComponent;
