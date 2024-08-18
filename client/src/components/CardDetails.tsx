import React, { useState, ChangeEvent } from "react";
import { Card, ChecklistEntry } from "../types";

import useKeyPress from "../hooks/useKeyPress";
import CreateCardComponent from "./CreateCardComponent";

import { useBoard } from "../context/BoardContext";
import CheckboxItem from "./CheckboxItem";
import DeleteModal from "./DeleteModal";
import { useTemplates } from "../context/TemplateContext";
import ButtonComponent, { ButtonStyle } from "./ButtonComponent";
import { validateTextInput } from "../utils/inputUtils";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Heading,
  Text,
  Flex,
  Button,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

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
    // validate new card name and notes when editing
    const validatedCardName = validateTextInput(cardName);
    const validatedNotes = validateTextInput(notes ?? "");

    if (isEditing) {
      if (!validatedCardName) {
        setError("Please enter a valid name.");
        return;
      }

      const updatedCard: Card = {
        id: selectedCard!.id,
        cardName: validatedCardName || selectedCard!.cardName,
        order: selectedCard!.order,
        column: selectedCard!.column,
        creationDate: selectedCard!.creationDate,
        details: {
          checklist: checklistItems,
          notes: validatedNotes || selectedCard!.details.notes || "",
          timeEstimate: timeEstimate,
        },
      };
      handleUpdateCard(updatedCard, isTemplate);
      setSelectedCard(updatedCard);
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
    const sanitizedNewItem = validateTextInput(newChecklistItem);
    if (sanitizedNewItem) {
      if (
        !checklistItems.map((item) => item.value).includes(sanitizedNewItem)
      ) {
        const newItem: ChecklistEntry = {
          checked: false,
          value: sanitizedNewItem,
        };
        setChecklistItems([...checklistItems, newItem]);
        setNewChecklistItem("");
      } else {
        setError("This checklist item already exists");
      }
    } else {
      setError("Please enter a valid checklist item");
    }
  };

  const handleTimeEstimateChange = (num: number) => {
    //const value = e.target.value;
    setTimeEstimate(num);
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
    console.log("PARTS HERE ", parts);

    return parts.map((part, index) =>
      urls.includes(part) ? (
        <div key={index}>
          <a
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="text-blue-500 hover:underline break-all"
          >
            {part}
          </a>
        </div>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  if (selectedCard!.id === "0") {
    return <CreateCardComponent />;
  }

  if (isEditing) {
    return (
      <Box
        p={4}
        w={{ base: "100%", md: "50%" }}
        mx="auto"
        bg="gray.100"
        shadow="md"
        borderRadius="lg"
      >
        {error && (
          <Text color="red.500" mb={4} textAlign="center" role="alert">
            {error}
          </Text>
        )}

        <Input
          type="text"
          value={cardName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setCardName(e.target.value);
            if (error && error.includes("Please enter a valid name.")) {
              setError(null);
            }
          }}
          borderRadius="md"
          bg="white"
          mb={4}
          fontWeight="bold"
          fontSize="2xl"
          aria-label="Card Name"
        />

        <Box maxH="80" overflowY="scroll" mb={4}>
          <UnorderedList ml={0} spacing={2}>
            {checklistItems.map((item, index) => (
              <ListItem key={index} display="flex" alignItems="center">
                <CheckboxItem
                  item={item}
                  index={index}
                  isEditing={true}
                  setChecklistItems={setChecklistItems}
                />
              </ListItem>
            ))}
          </UnorderedList>
        </Box>

        <Flex alignItems="center" mb={4}>
          <Input
            type="text"
            value={newChecklistItem}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewChecklistItem(e.target.value)
            }
            size="sm"
            borderRadius="md"
            px={2}
            py={1}
            mr={2}
            flexGrow={1}
            placeholder="Add checklist item"
            bg="white"
          />
          <Button
            onClick={(e) => handleAddChecklistItem(e!)}
            colorScheme="teal"
            variant="outline"
            size="sm"
            ml={2}
            borderWidth={2}
          >
            Add
          </Button>
        </Flex>

        <FormControl mb={4}>
          <FormLabel>Notes:</FormLabel>
          <Textarea
            value={notes}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setNotes(e.target.value)
            }
            borderRadius="md"
            bg="white"
            px={2}
            py={1}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Time Estimate (minutes):</FormLabel>
          <NumberInput
            value={timeEstimate}
            min={0}
            max={360}
            step={5}
            onChange={(_, valueAsNumber) =>
              handleTimeEstimateChange(valueAsNumber)
            }
            w="100%"
            bg="white"
            borderRadius="md"
          >
            <NumberInputField borderRadius="md" px={2} py={1} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <Flex justifyContent="space-between" mt={4}>
          <Button onClick={handleToggleEditing} colorScheme="teal">
            Save
          </Button>
          <Button onClick={() => setIsEditing(false)} colorScheme="red">
            Cancel
          </Button>
        </Flex>
      </Box>
    );
  }

  return (
    <Box
      p={4}
      w={{ base: "100%", md: "50%" }}
      mx="auto"
      bg="gray.100"
      shadow="md"
      borderRadius="lg"
      tabIndex={0}
      aria-label={`Card details for ${selectedCard!.cardName}`}
      onKeyDown={(e) => {
        if (e.key === "Escape") setSelectedCard(null);
      }}
    >
      {error && (
        <Text color="red.500" mb={4} textAlign="center" role="alert">
          {error}
        </Text>
      )}

      <Heading as="h2" size="lg" fontWeight="bold" mb={4}>
        {selectedCard!.cardName}
      </Heading>

      <Box maxH="64" minH="32" overflowY="scroll" mb={4}>
        <UnorderedList ml={0} spacing={2}>
          {checklistItems.map((item, index) => (
            <ListItem key={index} display="flex" alignItems="center">
              <CheckboxItem
                item={item}
                index={index}
                isEditing={false}
                setChecklistItems={setChecklistItems}
              />
            </ListItem>
          ))}
        </UnorderedList>
      </Box>

      <Text mb={2}>Notes: {renderTextWithLinks(notes || "")}</Text>

      <Text mb={2}>Time Estimate: {timeEstimate} Minutes</Text>
      <Text mb={4}>Column: {selectedCard!.column}</Text>

      <Flex justifyContent="space-between" alignItems="center">
        <Flex gap={2}>
          <Button onClick={() => setSelectedCard(null)} colorScheme="gray">
            Close
          </Button>
          {!isTemplate || templateIsOwned ? (
            <Button onClick={handleToggleEditing} colorScheme="teal">
              Edit
            </Button>
          ) : null}
        </Flex>

        {!isTemplate || templateIsOwned ? (
          <>
            {!isConfirmingDelete ? (
              <Button onClick={handleDeleteButtonPressed} colorScheme="red">
                Delete
              </Button>
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
        ) : null}
      </Flex>
    </Box>
  );
};

export default CardDetails;
