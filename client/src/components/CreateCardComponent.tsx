import React, { useState, FormEvent, ChangeEvent } from "react";
import { Card, Columns } from "../types";

export type ChecklistEntry = {
	checked: boolean;
	value: string;
};

interface CreateCardComponentProps {
	boardCards: Card[];
	handlePostNewCard: (newCard: Card) => void;
	handleResetSelectedCard: () => void;
}

const CreateCardComponent: React.FC<CreateCardComponentProps> = ({
	boardCards,
	handlePostNewCard,
	handleResetSelectedCard,
}) => {
	const [cardName, setCardName] = useState("");
	const [notes, setNotes] = useState("");
	const [timeEstimate, setTimeEstimate] = useState(0);
	const [checklistItems, setChecklistItems] = useState<ChecklistEntry[]>([]);
	const [newChecklistItem, setNewChecklistItem] = useState("");

	const handleAddChecklistItem = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();
		if (newChecklistItem) {
			const newItem: ChecklistEntry = {
				checked: false,
				value: newChecklistItem,
			};
			setChecklistItems([...checklistItems, newItem]);
			setNewChecklistItem("");
		}
	};

	const handleTimeEstimateChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setTimeEstimate(value === "" ? 0 : parseInt(value, 10));
		// BUG: if I don't set the default value as 0 then I get a NaN error if the user makes field empty should be easy fix
	};

	const getNextId = () => {
		const maxId =
			boardCards.length > 0
				? Math.max(...boardCards.map((card) => card.id))
				: 0;
		return maxId + 1;
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const newCard: Card = {
			id: getNextId(),
			cardName: cardName,
			order: 1,
			column: Columns.backlog,
			creationDate: new Date(),
			details: {
				checklist: checklistItems,
				notes: notes,
				timeEstimate: timeEstimate,
			},
		};

		handlePostNewCard(newCard);
		handleResetSelectedCard();
	};

	return (
		<div className="p-4 w-1/2 mx-auto bg-secondaryElements shadow-md rounded-lg">
			<h2 className="text-lg font-bold mb-4">Create New Card</h2>
			<form onSubmit={handleSubmit}>
				<label className="block mb-2">
					Card Name:
					<input
						type="text"
						value={cardName}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setCardName(e.target.value)
						}
						className="rounded px-2 py-1 mb-2 w-full"
					/>
				</label>
				<label className="block mb-2">
					Notes:
					<textarea
						value={notes}
						onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
							setNotes(e.target.value)
						}
						className="rounded px-2 py-1 mb-2 w-full"
					/>
				</label>
				<label className="block mb-2">
					Time Estimate (minutes):
					<input
						type="number"
						value={timeEstimate}
						onChange={handleTimeEstimateChange}
						className="rounded px-2 py-1 mb-2 w-full"
					/>
				</label>
				<div className="mb-4">
					<h3 className="font-bold mb-2">Checklist</h3>
					<ul>
						{checklistItems.map((item, index) => (
							<li key={index} className="mb-1 flex items-center">
								<input
									type="checkbox"
									checked={item.checked}
									onChange={() => {}} // Placeholder for change handler
								/>
								{item.value}
							</li>
						))}
					</ul>
					<div className="flex">
						<input
							type="text"
							value={newChecklistItem}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setNewChecklistItem(e.target.value)
							}
							className="rounded px-2 py-1 mr-2 flex-grow"
							placeholder="Add checklist item"
						/>
						<button
							onClick={handleAddChecklistItem}
							className="ml-2 bg-flair font-primary text-secondaryElements px-4 py-2 rounded hover:text-white"
						>
							Add
						</button>
					</div>
				</div>
				<button
					type="submit"
					className=" bg-flair font-primary text-secondaryElements px-4 py-2 rounded hover:text-white"
				>
					Create Card
				</button>
			</form>
		</div>
	);
};

export default CreateCardComponent;
