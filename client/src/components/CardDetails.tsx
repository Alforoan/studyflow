import React, { useState, ChangeEvent } from "react";
import { Card, ChecklistEntry } from "../types";

import useKeyPress from "../hooks/useKeyPress";
import CreateCardComponent from "./CreateCardComponent";

import { useBoard } from "../context/BoardContext";
import CheckboxItem from "./CheckboxItem";

const CardDetails: React.FC = () => {
  const { selectedCard, setSelectedCard, handleUpdateCard, handleDeleteCard } =
    useBoard();

  const [isEditing, setIsEditing] = useState<Boolean>(false);

  const [cardName, setCardName] = useState(selectedCard!.cardName);
  const [notes, setNotes] = useState(selectedCard!.details.notes);
  const [timeEstimate, setTimeEstimate] = useState(
    selectedCard!.details.timeEstimate
  );
  const [checklistItems, setChecklistItems] = useState<ChecklistEntry[]>(
    selectedCard!.details.checklist!
  );
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const handleToggleEditing = () => {
    if (isEditing) {
      const updatedCard: Card = {
        id: selectedCard!.id,
        cardName: cardName,
        order: selectedCard!.order,
        column: selectedCard!.column,
        creationDate: selectedCard!.creationDate,
        details: {
          checklist: checklistItems,
          notes: notes,
          timeEstimate: timeEstimate,
        },
      };
      handleUpdateCard(updatedCard);
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
    handleDeleteCard(selectedCard!);
    setSelectedCard(null);
  };

  const handleDeleteCanceled = () => {
    setIsConfirmingDelete(false);
  };

  // Use custom hook to handle ESC key
  useKeyPress("Escape", () => setSelectedCard(null));

  return selectedCard!.id === "0" ? (
    <CreateCardComponent />
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
            className="rounded mb-2 pl-2 w-full text-lg font-bold bg-white"
          />
          <ul className="max-h-80 overflow-y-scroll">
            {checklistItems.map((item, index) => (
              <li key={index} className="flex items-center mb-2">
                <CheckboxItem
                  item={item}
                  index={index}
                  isEditing={true}
                  setChecklistItems={setChecklistItems}
                />
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
              className="rounded px-2 py-1 mr-2 mt-2 flex-grow"
              placeholder="Add checklist item"
            />
            <button
              onClick={handleAddChecklistItem}
              className="ml-2 py-1.5 px-3 text-sm bg-black text-white rounded"
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
          <h2 className="text-lg font-bold mb-2">{selectedCard!.cardName}</h2>
          <ul className="max-h-64 min-h-32 overflow-y-scroll">
            {checklistItems.map((item, index) => (
              <li key={index} className="flex items-center mb-2">
                <CheckboxItem
                  item={item}
                  index={index}
                  isEditing={false}
                  setChecklistItems={setChecklistItems}
                />
              </li>
            ))}
          </ul>
          <p className="mt-4">Notes: {notes}</p>
          <p className="mt-1">Time Estimate: {timeEstimate} Minutes</p>
          <p className="mt-1">Column: {selectedCard!.column}</p>
        </>
      )}
      <button
        className="mt-8 py-1.5 px-2 text-sm bg-black text-white rounded "
        onClick={() => setSelectedCard(null)}
      >
        Close
      </button>
      <button
        className="ml-1 mt-8 py-1.5 px-3 text-sm bg-black text-white rounded"
        onClick={() => handleToggleEditing()}
      >
        {isEditing ? "Save" : "Edit"}
      </button>
      {!isConfirmingDelete ? (
        <button
          className="py-1.5 px-2 text-sm bg-red-500 text-white rounded"
          onClick={handleDeleteButtonPressed}
          style={{
            position: "absolute",
            bottom: 16,
            right: 20,
            cursor: "pointer",
          }}
          aria-label="Delete Card"
        >
          Delete
        </button>
      ) : (
        <>
          <button
            className="py-1.5 px-2 text-sm bg-black text-white rounded"
            onClick={handleDeleteCanceled}
            style={{
              position: "absolute",
              bottom: 16,
              right: 89,
              cursor: "pointer",
            }}
            aria-label="Delete Card"
          >
            Cancel
          </button>
          <button
            className="py-1.5 px-2 text-sm bg-black text-white rounded"
            onClick={handleDeleteConfirmed}
            style={{
              position: "absolute",
              bottom: 16,
              right: 20,
              cursor: "pointer",
            }}
            aria-label="Delete Card"
          >
            Confirm
          </button>
        </>
      )}
    </div>
  );
};

export default CardDetails;
