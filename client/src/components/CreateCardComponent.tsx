import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { Card, Columns } from "../types";
import { v4 as uuidv4 } from "uuid";
import { useBoard } from "../context/BoardContext";
import CheckboxItem from "./CheckboxItem";
import { FaPlus, FaTimes } from 'react-icons/fa';

export type ChecklistEntry = {
  checked: boolean;
  value: string;
};

const CreateCardComponent: React.FC = () => {
  const [cardName, setCardName] = useState("");
  const [notes, setNotes] = useState("");
  const [timeEstimate, setTimeEstimate] = useState(0);
  const [checklistItems, setChecklistItems] = useState<ChecklistEntry[]>([]);
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { selectedBoard, handlePostNewCard, setSelectedCard, selectedCard } = useBoard();

  const handleAddChecklistItem = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

  useEffect(() => {
    console.log({ selectedCard });
  }, [selectedCard]);

  const handleTimeEstimateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTimeEstimate(value === "" ? 0 : Math.max(0, parseInt(value, 10)));
  };

  const getTotalInBacklog = () => {
    return selectedBoard!.cards!.reduce((total: number, card: Card) => {
      return card.column === Columns.backlog ? total + 1 : total;
    }, 0);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!cardName.trim()) {
      setError("Please name your card.");
      return;
    }

    if (checklistItems.length === 0) {
      setError("Please add a checklist item.");
      return;
    }

    if (timeEstimate <= 0) {
      setError("Please enter a time greater than 0.");
      return;
    }

    const newCard: Card = {
      id: uuidv4(),
      cardName: cardName,
      order: getTotalInBacklog(),
      column: Columns.backlog,
      creationDate: new Date(),
      details: {
        checklist: checklistItems,
        notes: notes,
        timeEstimate: timeEstimate,
      },
    };

    const isUniqueName = !selectedBoard!.cards!.some((card) => card.cardName === newCard.cardName);
    if (!isUniqueName) {
      setError("Change your card name.");
      return;
    }

    handlePostNewCard(newCard);
    setSelectedCard(null);
  };

  const handleCardNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardName(e.target.value);
    setError(null);
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto bg-secondaryElements shadow-md rounded-lg">
      {error && <p className="text-red-500 mb-4 text-center text-sm">{error}</p>}
      <h2 className="text-lg font-bold mb-4">Create New Card</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="cardName">
            Card Name:
          </label>
          <input
            id="cardName"
            type="text"
            value={cardName}
            onChange={handleCardNameChange}
            className="rounded px-3 py-2 w-full text-sm"
            placeholder="Enter card name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="notes">
            Notes:
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
            className="rounded px-3 py-2 w-full text-sm"
            rows={3}
            placeholder="Add notes (optional)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="timeEstimate">
            Time Estimate (minutes):
          </label>
          <input
            id="timeEstimate"
            type="number"
            value={timeEstimate}
            min="1"
            max="360"
            onChange={handleTimeEstimateChange}
            className="rounded px-3 py-2 w-full text-sm"
          />
        </div>
        <div>
          <h3 className="font-bold text-sm mb-2">Checklist</h3>
          <ul className="space-y-2">
            {checklistItems.map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckboxItem
                  item={item}
                  index={index}
                  setChecklistItems={setChecklistItems}
                  isEditing={true}
                />
              </li>
            ))}
          </ul>
          <div className="flex items-center mt-2">
            <input
              type="text"
              value={newChecklistItem}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewChecklistItem(e.target.value)}
              className="rounded-l px-3 py-2 flex-grow text-sm"
              placeholder="Add checklist item"
            />
            <button
              onClick={handleAddChecklistItem}
              className="bg-flair text-secondaryElements px-3 py-2 rounded-r hover:text-white"
            >
              <FaPlus size={14} />
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-flair font-primary text-secondaryElements px-4 py-2 rounded hover:text-white text-sm"
          >
            Create Card
          </button>
          <button
            type="button"
            onClick={() => setSelectedCard(null)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCardComponent;