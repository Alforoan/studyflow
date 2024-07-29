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

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [cardName, setCardName] = useState(selectedCard!.cardName);
  const [notes, setNotes] = useState(selectedCard!.details.notes);
  const [timeEstimate, setTimeEstimate] = useState(selectedCard!.details.timeEstimate);
  const [checklistItems, setChecklistItems] = useState<ChecklistEntry[]>(selectedCard!.details.checklist!);
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useKeyPress("Escape", () => setSelectedCard(null));

  const handleToggleEditing = () => {
    if (isEditing) {
      const updatedCard: Card = {
        ...selectedCard!,
        cardName,
        details: {
          checklist: checklistItems,
          notes,
          timeEstimate,
        },
      };
      handleUpdateCard(updatedCard, isTemplate);
      setIsToastSuccess("Card updated successfully");
      setTimeout(() => setIsToastSuccess(""), 1000);
    }
    setIsEditing(!isEditing);
  };

  const handleAddChecklistItem = () => {
    if (newChecklistItem && !checklistItems.some(item => item.value === newChecklistItem)) {
      setChecklistItems([...checklistItems, { checked: false, value: newChecklistItem }]);
      setNewChecklistItem("");
      setError(null);
    } else if (newChecklistItem) {
      setError("This checklist item already exists");
    }
  };

  const renderTextWithLinks = (text: string) => {
    const urlRegex = /\b(https?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    const parts = text.split(urlRegex);
    return parts.map((part, index) => 
      urlRegex.test(part) ? (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
          {part}
        </a>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  if (selectedCard!.id === "0") return <CreateCardComponent />;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4" id="card-modal">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="p-6 space-y-6">
          {error && <p className="text-red-500 text-center" role="alert">{error}</p>}
          
          {isEditing ? (
            <input
              type="text"
              value={cardName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCardName(e.target.value)}
              className="w-full p-2 border rounded text-lg font-semibold"
              placeholder="Card Name"
            />
          ) : (
            <h3 className="text-xl font-semibold text-gray-900">{cardName}</h3>
          )}

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Checklist:</h4>
              <ul className="space-y-2 max-h-48 overflow-y-auto bg-gray-100 p-3 rounded">
                {checklistItems.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2 bg-white p-2 rounded shadow">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => {
                        const newItems = [...checklistItems];
                        newItems[index].checked = !newItems[index].checked;
                        setChecklistItems(newItems);
                      }}
                      className="form-checkbox h-5 w-5 text-blue-600"
                      disabled={!isEditing}
                    />
                    <span className={`flex-grow ${item.checked ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                      {item.value}
                    </span>
                    {isEditing && (
                      <button
                        onClick={() => {
                          const newItems = checklistItems.filter((_, i) => i !== index);
                          setChecklistItems(newItems);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              {isEditing && (
                <div className="flex mt-2">
                  <input
                    type="text"
                    value={newChecklistItem}
                    onChange={(e) => setNewChecklistItem(e.target.value)}
                    className="flex-grow p-2 border rounded-l"
                    placeholder="New checklist item"
                  />
                  <ButtonComponent
                    click={handleAddChecklistItem}
                    text="Add"
                    buttonType={ButtonStyle.InnerOther}
                    additionalStyles="rounded-l-none"
                  />
                </div>
              )}
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">Notes:</h4>
              {isEditing ? (
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={4}
                />
              ) : (
                <p className="break-words bg-gray-100 p-3 rounded">{renderTextWithLinks(notes || "")}</p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-700 mb-1">Time Estimate:</h4>
                {isEditing ? (
                  <input
                    type="number"
                    value={timeEstimate}
                    onChange={(e) => setTimeEstimate(parseInt(e.target.value) || 0)}
                    className="w-24 p-2 border rounded"
                    min="0"
                  />
                ) : (
                  <p className="bg-gray-100 p-2 rounded">{timeEstimate} minutes</p>
                )}
              </div>

              {!isEditing && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Column:</h4>
                  <p className="bg-gray-100 p-2 rounded">{selectedCard!.column}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse space-x-2">
          <ButtonComponent
            click={() => setSelectedCard(null)}
            text="Close"
            buttonType={ButtonStyle.InnerOther}
            additionalStyles="w-full sm:w-auto"
          />
          {(!isTemplate || templateIsOwned) && (
            <>
              <ButtonComponent
                click={handleToggleEditing}
                text={isEditing ? "Save" : "Edit"}
                buttonType={ButtonStyle.InnerConfirm}
                additionalStyles="w-full sm:w-auto"
              />
              <ButtonComponent
                click={() => setIsConfirmingDelete(true)}
                text="Delete"
                buttonType={ButtonStyle.InnerDelete}
                additionalStyles="w-full sm:w-auto"
              />
            </>
          )}
        </div>
      </div>

      <DeleteModal
        isOpen={isConfirmingDelete}
        onClose={() => setIsConfirmingDelete(false)}
        onDelete={() => {
          handleDeleteCard(selectedCard!, isTemplate);
          setSelectedCard(null);
          setIsConfirmingDelete(false);
        }}
        message="Are you sure you want to delete this card?"
        type="card"
        id={selectedCard!.id}
      />
    </div>
  );
};

export default CardDetails;