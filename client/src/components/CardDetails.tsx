import React, { useState, ChangeEvent } from "react";
import { Card, ChecklistEntry } from "../types";

import useKeyPress from "../hooks/useKeyPress";
import CreateCardComponent from "./CreateCardComponent";

import { useBoard } from "../context/BoardContext";
import CheckboxItem from "./CheckboxItem";
import DeleteModal from "./DeleteModal";
import { useTemplates } from "../context/TemplateContext";
import ButtonComponent, { ButtonStyle } from "./ButtonComponent";

const CardDetails: React.FC = () => {
  const {
    selectedCard,
    setSelectedCard,
    handleUpdateCard,
    handleDeleteCard,
    setIsToastSuccess,
  } = useBoard();

  const { isTemplate, templateIsOwned } = useTemplates();

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

  const [error, setError] = useState<string | null>(null);

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
      handleUpdateCard(updatedCard, isTemplate);
      setIsToastSuccess("Card updated successfully");
      setTimeout(() => {
        setIsToastSuccess("");
      }, 1000);
    }
    setIsEditing(!isEditing);
  };

  const handleAddChecklistItem = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (newChecklistItem) {
      if (
        !checklistItems.map((item) => item.value).includes(newChecklistItem)
      ) {
        const newItem: ChecklistEntry = {
          checked: false,
          value: newChecklistItem,
        };
        setChecklistItems([...checklistItems, newItem]);
        setNewChecklistItem("");
      } else {
        setError("This checklist item already exists");
      }
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
    handleDeleteCard(selectedCard!, isTemplate);
    setSelectedCard(null);
    setIsConfirmingDelete(false);
  };

  const handleDeleteCanceled = () => {
    setIsConfirmingDelete(false);
  };

  // Use custom hook to handle ESC key
  useKeyPress("Escape", () => setSelectedCard(null));

  const extractUrls = (text: string): string[] => {
    const urlRegex =
      /\b(https?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]|youtu\.be\/[-A-Z0-9+&@#\/%=~_|]{11}|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=)[-A-Z0-9+&@#\/%=~_|]{11})/gi;
    return text.match(urlRegex) || [];
  };

  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const renderTextWithLinks = (text: string) => {
    const urls = extractUrls(text);

    if (urls.length === 0) {
      return text;
    }

    const splitRegex = new RegExp(`(${urls.map(escapeRegExp).join("|")})`);
    const parts = text.split(splitRegex);

    return parts.map((part, index) =>
      urls.includes(part) ? (
        <a
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          key={index}
          className="text-blue-500 hover:underline"
        >
          {part}
        </a>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return selectedCard!.id === "0" ? (
    <CreateCardComponent />
  ) : (
    <div
      className="relative p-4 w-1/2 mx-auto bg-secondaryElements shadow-md rounded-lg"
      tabIndex={0}
      aria-label={`Card details for ${selectedCard!.cardName}`}
      onKeyDown={(e) => {
        if (e.key === "Escape") setSelectedCard(null);
      }}
    >
      {error && (
        <p className="text-red-500 mb-4 text-center" role="alert">
          {error}
        </p>
      )}
      {isEditing ? (
        <>
          <input
            type="text"
            value={cardName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCardName(e.target.value)
            }
            className="rounded mb-2 pl-2 w-full text-lg font-bold bg-white"
            aria-label="Card Name"
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
              aria-label="New Checklist Item"
            />
            <ButtonComponent
              click={(e) => handleAddChecklistItem(e!)}
              text={"Add"}
              buttonType={ButtonStyle.InnerOther}
            />
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
              aria-label="Time Estimate Input"
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
          <p className="mt-4 break-all">
            Notes: {renderTextWithLinks(notes || "")}
          </p>
          <p className="mt-1">Time Estimate: {timeEstimate} Minutes</p>
          <p className="mt-1">Column: {selectedCard!.column}</p>
        </>
      )}
      <ButtonComponent
        click={() => setSelectedCard(null)}
        text={"Close"}
        buttonType={ButtonStyle.InnerOther}
      />

      {(!isTemplate || templateIsOwned) && (
        <>
          <ButtonComponent
            click={() => handleToggleEditing()}
            text={isEditing ? "Save" : "Edit"}
            buttonType={ButtonStyle.InnerConfirm}
          />

          {!isConfirmingDelete ? (
            <ButtonComponent
              click={handleDeleteButtonPressed}
              text={"Delete"}
              buttonType={ButtonStyle.InnerDelete}
              additionalStyles="absolute bottom-4 right-5"
            />
          ) : (
            <DeleteModal
              isOpen={isConfirmingDelete}
              onClose={handleDeleteCanceled}
              onDelete={handleDeleteConfirmed}
              message="Are you sure you want to delete this card?"
              type="card"
              id={selectedCard!.id}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CardDetails;
