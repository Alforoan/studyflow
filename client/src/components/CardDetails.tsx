import React, { useState, ChangeEvent } from "react";
import { Card, ChecklistEntry } from "../types";

import useKeyPress from "../hooks/useKeyPress";
import CreateCardComponent from "./CreateCardComponent";

interface CardDetailsProps {
	boardCards: Card[];
	selectedCard: Card;
	handleUpdateSelectedCard: (card: Card) => void;
	handleResetSelectedCard: () => void;
	handlePostNewCard: (newCard: Card) => void;
	handleDeleteCard: (cardToDelete: Card) => void;
}

const CardDetails: React.FC<CardDetailsProps> = ({
	boardCards,
	selectedCard,
	handleUpdateSelectedCard,
	handleResetSelectedCard,
	handlePostNewCard,
	handleDeleteCard,
}) => {
	const [isEditing, setIsEditing] = useState<Boolean>(false);

	const [cardName, setCardName] = useState(selectedCard.cardName);
	const [notes, setNotes] = useState(selectedCard.details.notes);
	const [timeEstimate, setTimeEstimate] = useState(
		selectedCard.details.timeEstimate
	);
	const [checklistItems, setChecklistItems] = useState<ChecklistEntry[]>(
		selectedCard.details.checklist!
	);
	const [newChecklistItem, setNewChecklistItem] = useState("");

	const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

	const handleToggleEditing = () => {
		if (isEditing) {
			const updatedCard: Card = {
				id: selectedCard.id,
				cardName: cardName,
				order: selectedCard.order,
				column: selectedCard.column,
				creationDate: selectedCard.creationDate,
				details: {
					checklist: checklistItems,
					notes: notes,
					timeEstimate: timeEstimate,
				},
			};
			handleUpdateSelectedCard(updatedCard);
		}
		setIsEditing(!isEditing);
	};

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

	const handleDeleteButtonPressed = () => {
		setIsConfirmingDelete(true);
	};

	const handleDeleteConfirmed = () => {
		handleDeleteCard(selectedCard);
		handleResetSelectedCard();
	};

	const handleDeleteCanceled = () => {
		setIsConfirmingDelete(false);
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

		handleUpdateSelectedCard(newSelectedCard);
	};

	// Use custom hook to handle ESC key
	useKeyPress("Escape", handleResetSelectedCard);

	return selectedCard.id === "0" ? (
		<CreateCardComponent
			boardCards={boardCards}
			handlePostNewCard={handlePostNewCard}
			handleResetSelectedCard={handleResetSelectedCard}
		/>
	) : (
		<div className="relative p-4 w-1/2 mx-auto bg-secondaryElements shadow-md rounded-lg">
			{isEditing ? (
				<>
					<input
						type="text"
						value={cardName}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setCardName(e.target.value)
						}
						className="rounded mb-2 w-full text-lg font-bold bg-white"
					/>
					<ul>
						{checklistItems.map((item, index) => (
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
					<div>
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
							className="ml-2 py-1.5 px-8 text-sm bg-black text-white rounded"
						>
							Add
						</button>
					</div>
					<label className="block my-2">
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
				</>
			) : (
				<>
					<h2 className="text-lg font-bold mb-2">{selectedCard.cardName}</h2>
					<ul>
						{checklistItems.map((item, index) => (
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
					<p className="mt-4">Notes: {notes}</p>
					<p className="mt-1">Time Estimate: {timeEstimate} Minutes</p>
					<p className="mt-1">Column: {selectedCard.column}</p>
				</>
			)}
			<button
				className="mt-8 py-1.5 px-8 text-sm bg-black text-white rounded "
				onClick={() => handleResetSelectedCard()}
			>
				Close
			</button>
			<button
				className="ml-4 mt-8 py-1.5 px-4 text-sm"
				onClick={() => handleToggleEditing()}
			>
				{isEditing ? "✅" : "✏️"}
			</button>
			{!isConfirmingDelete ? (
				<button
					onClick={handleDeleteButtonPressed}
					style={{
						position: "absolute",
						bottom: 24,
						right: 20,
						cursor: "pointer",
					}}
					aria-label="Delete Card"
				>
					🗑️
				</button>
			) : (
				<>
					<button
						onClick={handleDeleteCanceled}
						style={{
							position: "absolute",
							bottom: 24,
							right: 50,
							cursor: "pointer",
						}}
						aria-label="Delete Card"
					>
						❌
					</button>
					<button
						onClick={handleDeleteConfirmed}
						style={{
							position: "absolute",
							bottom: 24,
							right: 20,
							cursor: "pointer",
						}}
						aria-label="Delete Card"
					>
						✅
					</button>
				</>
			)}
		</div>
	);
};

export default CardDetails;
