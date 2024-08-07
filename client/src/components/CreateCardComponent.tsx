import React, { useState, ChangeEvent, useEffect } from "react";
import { Card, Columns } from "../types";
import { v4 as uuidv4 } from "uuid";
import { useBoard } from "../context/BoardContext";
import CheckboxItem from "./CheckboxItem";
import { useTemplates } from "../context/TemplateContext";
import ButtonComponent, { ButtonStyle } from "./ButtonComponent";
import { validateTextInput } from "../utils/inputUtils";

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
  // card info error handling
  const [error, setError] = useState<string | null>(null);
  const {
    selectedBoard,
    handlePostNewCard,
    setSelectedCard,
    selectedCard,
    setIsToastSuccess,
  } = useBoard();

  const { isTemplate, handlePostTemplateCard } = useTemplates();
  const handleAddChecklistItem = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (newChecklistItem) {
      if (
        !checklistItems.map((item) => item.value).includes(newChecklistItem)
      ) {
        // clean and sanitize checknbox items upon card creation
        const validatedItem = validateTextInput(newChecklistItem);
        if (validatedItem) {
          const newItem: ChecklistEntry = {
            checked: false,
            value: validatedItem,
          };
          setChecklistItems([...checklistItems, newItem]);
          setNewChecklistItem("");
          setError(null); // Clear error on successful addition
        } else {
          setError("Please enter a valid checklist item.");
        }
      } else {
        setError("This checklist item already exists");
      }
    }
  };

  useEffect(() => {
    console.log({ selectedCard });
  });

  const handleTimeEstimateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTimeEstimate(value === "" ? 0 : parseInt(value, 10));
    // BUG: if I don't set the default value as 0 then I get a NaN error if the user makes field empty should be easy fix
  };

  const getTotalInBacklog = () => {
    return selectedBoard!.cards!.reduce((total: number, card: Card) => {
      return card.column === Columns.backlog ? total + 1 : total;
    }, 0);
  };

  const handleCreateCard = () => {
    const validatedCardName = validateTextInput(cardName)?.trim();
    const validatedNotes = validateTextInput(notes);

    if (!validatedCardName) {
      setError("Please name your card.");
      return;
    }

    if (checklistItems.length === 0) {
      setError("Please add a checklist item.");
      return;
    }

    if (timeEstimate === undefined || timeEstimate <= 0) {
      setError("Please enter a time greater than 0.");
      return;
    }

    const newCard: Card = {
      id: uuidv4(),
      cardName: validatedCardName,
      order: getTotalInBacklog(),
      column: Columns.backlog,
      creationDate: new Date(),
      details: {
        checklist: checklistItems,
        notes: validatedNotes || "",
        timeEstimate: timeEstimate,
      },
    };
    let isUniqueName = true;
    selectedBoard!.cards!.find((card) => {
      if (card.cardName === newCard.cardName) {
        setError("Change your card name.");
        isUniqueName = false;
        return;
      }
    });
    if (!isUniqueName) {
      return;
    }
    if (isTemplate) {
      handlePostTemplateCard(newCard);
    } else {
      handlePostNewCard(newCard);
    }

    setIsToastSuccess("Card added successfully");
    setTimeout(() => {
      setIsToastSuccess("");
    }, 1000);
    setSelectedCard(null);
  };

  const handleCardNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardName(e.target.value);
    setError(null); // Clear error when user starts typing card name
  };

  return (
    <>
      <div className="p-4 w-1/2 mx-auto bg-secondaryElements shadow-md rounded-lg">
        {error && (
          <p className="text-red-500 mb-4 text-center" role="alert">
            {error}
          </p>
        )}
        <h2 className="text-lg font-bold mb-4">Create New Card</h2>
        <form>
          <label htmlFor="cardName" className="block mb-2">
            Card Name:
            <input
              type="text"
              value={cardName}
              onChange={handleCardNameChange}
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
              min="0"
              max="360"
              onChange={handleTimeEstimateChange}
              className="rounded px-2 py-1 mb-2 w-full"
            />
          </label>
          <div className="mb-4">
            <h3 className="font-bold mb-2">Checklist</h3>
            <ul>
              {checklistItems.map((item, index) => (
                <li key={index} className="mb-1 flex items-center">
                  <CheckboxItem
                    item={item}
                    index={index}
                    setChecklistItems={setChecklistItems}
                    isEditing={true}
                  />
                </li>
              ))}
            </ul>
            <div className="flex items-center my-4">
              <input
                type="text"
                value={newChecklistItem}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewChecklistItem(e.target.value)
                }
                className="rounded px-2 py-1 my-1 mr-2 flex-grow"
                placeholder="Add checklist item"
              />
              <ButtonComponent
                click={(e) => handleAddChecklistItem(e!)}
                buttonType={ButtonStyle.InnerConfirm}
                text={"Add"}
                additionalStyles="relative -top-4"
              />
            </div>
          </div>
          <ButtonComponent
            click={handleCreateCard}
            buttonType={ButtonStyle.InnerConfirm}
            text={"Create Card"}
            type="button"
          />

          <ButtonComponent
            click={() => setSelectedCard(null)}
            buttonType={ButtonStyle.InnerDelete}
            text={"Cancel"}
          />
        </form>
      </div>
    </>
  );
};

export default CreateCardComponent;
