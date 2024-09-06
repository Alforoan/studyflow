import React, { useEffect, useState } from "react";
import { useBoard } from "../context/BoardContext";
import { ChecklistEntry, Columns } from "../types";
import { useTemplates } from "../context/TemplateContext";
import LinkPreview from "./LinkPreview";
// import ButtonComponent, { ButtonStyle } from "./ButtonComponent";
import { validateTextInput } from "../utils/inputUtils";

import {
  Checkbox,
  Box,
  Text,
  Textarea,
  Input,
  Flex,
  Button,
  Icon,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  CheckIcon,
  // CloseIcon,
  DeleteIcon,
} from "@chakra-ui/icons";

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
  const [error, setError] = useState<string | null>(null);

  const { isTemplate } = useTemplates();

  useEffect(() => {
    if (itemText === item.value) {
      setIsEditingItem(false);
    }
    setNeedTextArea(itemText.length > 40);
  }, [itemText]);

  const areAllCardsChecked = (items: Array<{ checked: boolean }>) => {
    let isAllChecked = true;
    items.forEach((item: any) => {
      if (!item.checked) {
        isAllChecked = false;
      }
    });
    return isAllChecked;
  };

  const toggleCheck = () => {
    if (!selectedCard || !selectedCard.details.checklist) return;
    if (selectedCard.column !== Columns.inProgress) return;

    setChecklistItems((prevItems) => {
      const updatedChecklist = prevItems.map((item, idx) =>
        idx === index ? { ...item, checked: !item.checked } : item
      );

      const isAllChecked = areAllCardsChecked(updatedChecklist);
      console.log({isAllChecked});
      
      if(isAllChecked){
        const updatedCard = {
          ...selectedCard,
          column: Columns.completed
        }
        console.log({updatedCard});
        handleUpdateCard(updatedCard, isTemplate);
      }else{
        const newSelectedCard = {
          ...selectedCard,
          details: {
            ...selectedCard.details,
            checklist: updatedChecklist,
          },
        }; 
        handleUpdateCard(newSelectedCard, isTemplate);
      }
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

        handleUpdateCard(newSelectedCard, isTemplate);
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
    setError(null);
  };

  const updateItem = () => {
    if (!selectedCard || !selectedCard.details.checklist) return;
    if (isEditing) {
      // validate and sanitize edited checkbox items
      const sanitizedText = validateTextInput(itemText) || "";

      // ensure sanitizedText is not empty
      if (sanitizedText.trim() === "") {
        setError("Invalid");
        return;
      }

      setChecklistItems((prevItems) => {
        const updatedChecklist = prevItems.map((item, idx) =>
          idx === index ? { ...item, value: sanitizedText } : item
        );

        return updatedChecklist;
      });
      setItemText(sanitizedText);
    }
    setIsEditingItem(false);
  };

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
    console.log(urls);

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
          style={{ display: "inline" }}
          aria-label={`Link to ${part}`}
        >
          <LinkPreview url={part} />
        </a>
      ) : (
        <span key={index} className="inline">
          {part}
        </span>
      )
    );
  };

  return (
    <>
      {error && (
        <Text color="red.500" textAlign="center" role="alert">
          {error}
        </Text>
      )}
      {!isEditing && (
        <Checkbox
          id={item.value}
          isChecked={item.checked}
          onChange={() => toggleCheck()}
          isDisabled={selectedCard!.column !== Columns.inProgress}
          aria-label={`Toggle checkbox for ${item.value}`}
          display="none"
        />
      )}

      <Box
        as="label"
        htmlFor={item.value}
        display="inline-flex"
        alignItems="baseline"
        justifyContent="space-between"
        w="100%"
        borderRadius="lg"
        cursor="pointer"
        _hover={{ color: "gray.600" }}
        role="checkbox"
        aria-checked={item.checked}
      >
        {!isTemplate &&
          !isEditing &&
          selectedCard!.column !== Columns.backlog && (
            <Box
              w="38px"
              minW="38px"
              mr={2.5}
              py={1}
              textAlign="center"
              color="white"
              borderRadius="md"
              bg={item.checked ? "blue.500" : "white"}
              opacity={selectedCard!.column !== Columns.inProgress ? 0.25 : 1}
            >
              {/* {item.checked ? (
              <Icon as={CheckIcon} w={5} h={5} />
            ) : (
              <Icon as={CloseIcon} w={5} h={5} />
            )} */}
              <Icon as={CheckIcon} w={5} h={5} />
            </Box>
          )}

        <>
          {isEditing ? (
            needTextArea ? (
              <Textarea
                value={itemText}
                onChange={(e) => updateItemText(e.target.value)}
                w="100%"
                h="16"
                pl={4}
                py={1}
                bg="white"
                borderRadius="md"
                borderColor="gray.200"
                focusBorderColor="blue.500"
                autoFocus
              />
            ) : (
              <Input
                type="text"
                value={itemText}
                onChange={(e) => updateItemText(e.target.value)}
                w="100%"
                pl={4}
                py={1}
                bg="white"
                size="sm"
                borderRadius="md"
                borderColor="gray.200"
                focusBorderColor="blue.500"
                aria-label={`Edit item text for ${item.value}`}
                autoFocus
              />
            )
          ) : (
            <Box
              pl={4}
              py={1}
              bg="white"
              borderRadius="md"
              textDecoration={item.checked ? "line-through" : "none"}
              whiteSpace="break-spaces"
              w="100%"
            >
              {renderTextWithLinks(item.value)}
            </Box>
          )}
          {isEditing && (
            <Flex direction="column" gap={2} alignItems="top">
              <Button
                onClick={deleteItem}
                size="sm"
                variant="outline"
                colorScheme="red"
                ml={2}
                borderWidth={2}
              >
                <DeleteIcon />
              </Button>
              {isEditingItem && (
                <Button
                  onClick={updateItem}
                  size="sm"
                  variant="outline"
                  colorScheme="teal"
                  borderWidth={2}
                  ml={2}
                >
                  <CheckCircleIcon />
                </Button>
              )}
            </Flex>
          )}
        </>
      </Box>
    </>
  );
};

export default CheckboxItem;
