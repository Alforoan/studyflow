import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useBoard } from "../context/BoardContext";
import { Card, Columns } from "../types";
import CheckboxItem, { ChecklistEntry } from "./CheckboxItem";

const CreateCardComponent: React.FC = () => {
  const [cardName, setCardName] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [timeEstimate, setTimeEstimate] = useState<number>(0);
  const [checklistItems, setChecklistItems] = useState<ChecklistEntry[]>([]);
  const [newChecklistItem, setNewChecklistItem] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { selectedBoard, handlePostNewCard, setSelectedCard, setIsToastSuccess } = useBoard();

  useEffect(() => {
    console.log({ selectedBoard });
  }, [selectedBoard]);

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

  const getTotalInBacklog = (): number => {
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

    if (selectedBoard!.cards!.some((card) => card.cardName === newCard.cardName)) {
      setError("Card name must be unique.");
      return;
    }

    handlePostNewCard(newCard);
    setIsToastSuccess("Card added successfully");
    setTimeout(() => {
      setIsToastSuccess("");
    }, 1000);

    setSelectedCard(null);
  };

  const handleCardNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardName(e.target.value);
    setError(null);
  };

  const handleTimeEstimateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setTimeEstimate(isNaN(value) ? 0 : value);
  };

  return (
    <div className="p-4 w-full md:w-1/2 mx-auto bg-secondaryElements shadow-md rounded-lg">
      {error && <p className="text-red-500 mb-4 text-center text-sm">{error}</p>}
      <h2 className="text-lg font-bold mb-4 text-center">Create New Card</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Card Name:</label>
          <input
            type="text"
            value={cardName}
            onChange={handleCardNameChange}
            className="rounded px-3 py-2 w-full text-sm"
            placeholder="Enter card name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Notes:</label>
          <textarea
            value={notes}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
            className="rounded px-3 py-2 w-full text-sm"
            placeholder="Enter notes"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Time Estimate (minutes):</label>
          <input
            type="number"
            value={timeEstimate}
            min="0"
            max="1440" // Assuming a maximum of 24 hours for time estimate
            onChange={handleTimeEstimateChange}
            className="rounded px-3 py-2 w-full text-sm"
            placeholder="Enter time estimate"
            required
          />
        </div>
        <div>
          <h3 className="font-bold mb-2 text-sm">Checklist</h3>
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
              className="rounded px-3 py-2 flex-grow text-sm"
              placeholder="Add checklist item"
            />
            <button
              onClick={handleAddChecklistItem}
              className="ml-2 bg-flair font-primary text-secondaryElements px-4 py-2 rounded hover:text-white text-sm"
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            type="submit"
            className="bg-flair font-primary text-secondaryElements px-4 py-2 rounded hover:text-white text-sm w-full sm:w-auto"
          >
            Create Card
          </button>
          <button
            type="button"
            onClick={() => setSelectedCard(null)}
            className="bg-flair font-primary text-secondaryElements px-4 py-2 rounded hover:text-white text-sm w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCardComponent;
