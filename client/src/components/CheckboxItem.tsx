import React, { useEffect, useState } from "react";
import { useBoard } from "../context/BoardContext";
import { ChecklistEntry, Columns } from "../types";
import { useTemplates } from "../context/TemplateContext";

interface CheckboxItemProps {
  item: ChecklistEntry;
  index: number;
  setChecklistItems: (value: React.SetStateAction<ChecklistEntry[]>) => void;
  isEditing: boolean;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({
  item,
  index,
  setChecklistItems,
  isEditing,
}) => {
  const { selectedCard, handleUpdateCard } = useBoard();
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [itemText, setItemText] = useState(item.value);
  const [needTextArea, setNeedTextArea] = useState(false);

  const { isTemplate } = useTemplates();

  useEffect(() => {
    if (itemText === item.value) {
      setIsEditingItem(false);
    }
    setNeedTextArea(itemText.length > 40);
  }, [itemText]);

  const toggleCheck = () => {
    if (!selectedCard || !selectedCard.details.checklist) return;
    if (selectedCard.column !== Columns.inProgress) return;

    setChecklistItems((prevItems) => {
      const updatedChecklist = prevItems.map((item, idx) =>
        idx === index ? { ...item, checked: !item.checked } : item
      );

      const newSelectedCard = {
        ...selectedCard,
        details: {
          ...selectedCard.details,
          checklist: updatedChecklist,
        },
      };

      handleUpdateCard(newSelectedCard);
      return updatedChecklist;
    });
  };

  const deleteItem = () => {
    if (!selectedCard || !selectedCard.details.checklist) return;
    if (isEditing) {
      setChecklistItems((prevItems) => {
        const updatedChecklist = prevItems.filter((_, idx) => idx !== index);

        const newSelectedCard = {
          ...selectedCard,
          details: {
            ...selectedCard.details,
            checklist: updatedChecklist,
          },
        };

        handleUpdateCard(newSelectedCard);
        if (index !== updatedChecklist.length) {
          setItemText(updatedChecklist[index].value);
        }

        return updatedChecklist;
      });
    }
  };

  const updateItemText = (text: string) => {
    setItemText(text);
    setIsEditingItem(true);
  };

  const updateItem = () => {
    if (!selectedCard || !selectedCard.details.checklist) return;
    if (isEditing) {
      setChecklistItems((prevItems) => {
        const updatedChecklist = prevItems.map((item, idx) =>
          idx === index ? { ...item, value: itemText } : item
        );

        return updatedChecklist;
      });
    }
    setIsEditingItem(false);
  };

  const renderTextWithLinks = (text: string) => {
    const urlRegex =
      /(\bhttps?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    return text.split(urlRegex).map((part, index) => {
      return urlRegex.test(part) ? (
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
        part
      );
    });
  };

  return (
    <>
      <input
        type="checkbox"
        id={item.value}
        checked={item.checked}
        onChange={() => toggleCheck()}
        disabled={selectedCard!.column !== Columns.inProgress}
        className="hidden peer"
      />
      <label
        htmlFor={item.value}
        className="inline-flex items-center justify-between w-full rounded-lg cursor-pointer hover:text-gray-600"
      >
        {!isTemplate && (
          <div
            className={`w-1/12 mr-2.5 py-1 text-white rounded  ${
              item.checked ? "bg-blue-500" : "bg-white"
            } ${
              selectedCard!.column !== Columns.inProgress ? "opacity-25" : ""
            }`}
          >
            {item.checked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mx-auto text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586 15.293 5.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              "x"
            )}
          </div>
        )}

        <>
          {isEditing ? (
            needTextArea ? (
              <textarea
                value={itemText}
                onChange={(e) => updateItemText(e.target.value)}
                className=" h-24 pl-4 py-1 bg-white rounded border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                autoFocus
              />
            ) : (
              <input
                type="text"
                value={itemText}
                onChange={(e) => updateItemText(e.target.value)}
                className="w-11/12 pl-4 py-1 bg-white rounded border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                autoFocus
              />
            )
          ) : (
            <div
              className={`${
                !isTemplate ? "w-11/12" : "w-full"
              } break-all pl-4 py-1 bg-white rounded ${
                item.checked ? "line-through" : ""
              }`}
            >
              {renderTextWithLinks(item.value)}
            </div>
          )}
          {isEditing && (
            <div>
              {isEditingItem ? (
                <button
                  type="button"
                  onClick={updateItem}
                  className="top-0 right-0 px-1 text-xs"
                  style={{ margin: "4px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle cx="12" cy="12" r="10" fill="#28a745" />
                    <path
                      fill="#ffffff"
                      d="M16.707 8.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L10 13.586l4.293-4.293a1 1 0 011.414 0z"
                    />
                  </svg>
                  Save&nbsp;&nbsp;&nbsp;
                </button>
              ) : (
                <button
                  type="button"
                  onClick={deleteItem}
                  className="top-0 right-0 px-1 text-xs"
                  style={{ margin: "4px" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" fill="red" />
                    <path
                      d="M15 9L9 15"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9 9L15 15"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Delete
                </button>
              )}
            </div>
          )}
        </>
      </label>
    </>
  );
};

export default CheckboxItem;
