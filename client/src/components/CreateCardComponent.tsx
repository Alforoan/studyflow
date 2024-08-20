import React, { useState, ChangeEvent, useEffect } from "react";
import { Card, Columns } from "../types";
import { v4 as uuidv4 } from "uuid";
import { useBoard } from "../context/BoardContext";
import CheckboxItem from "./CheckboxItem";
import { useTemplates } from "../context/TemplateContext";
// import ButtonComponent, { ButtonStyle } from "./ButtonComponent";
import { validateTextInput } from "../utils/inputUtils";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  Heading,
  Text,
  Flex,
  UnorderedList,
  ListItem,
  Button,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

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

  const handleTimeEstimateChange = (num: number) => {
    //const value = e.target.value;
    setTimeEstimate(num);
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
    <Box
      p={4}
      w={{ base: "100%", md: "50%" }}
      mx="auto"
      bg="gray.100"
      shadow="md"
      borderRadius="lg"
      color="blackAlpha.900"
    >
      {error && (
        <Text color="red.500" mb={4} textAlign="center" role="alert">
          {error}
        </Text>
      )}
      <Heading as="h2" size="lg" fontWeight="bold" mb={4}>
        Create New Card
      </Heading>
      <form>
        <FormControl mb={4}>
          <FormLabel htmlFor="cardName">Card Name:</FormLabel>
          <Input
            id="cardName"
            type="text"
            value={cardName}
            onChange={handleCardNameChange}
            borderRadius="md"
            bg="white"
            px={2}
            py={1}
            mb={2}
            w="100%"
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Notes:</FormLabel>
          <Textarea
            value={notes}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setNotes(e.target.value)
            }
            borderRadius="md"
            px={2}
            py={1}
            mb={2}
            w="100%"
            bg="white"
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Time Estimate (minutes):</FormLabel>
          <NumberInput
            value={timeEstimate}
            min={0}
            max={360}
            step={5}
            onChange={(_valueAsString, valueAsNumber) =>
              handleTimeEstimateChange(valueAsNumber)
            }
            w="100%"
            mb={2}
            bg="white"
            borderRadius="md"
          >
            <NumberInputField borderRadius="md" px={2} py={1} />

            <NumberInputStepper>
              <NumberIncrementStepper color="blackAlpha.900" />
              <NumberDecrementStepper color="blackAlpha.900" />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <Box mb={4}>
          <Heading as="h3" size="md" fontWeight="bold" mb={2}>
            Checklist
          </Heading>
          <UnorderedList spacing={2}>
            {checklistItems.map((item, index) => (
              <ListItem key={index} display="flex" alignItems="center">
                <CheckboxItem
                  item={item}
                  index={index}
                  setChecklistItems={setChecklistItems}
                  isEditing={true}
                />
              </ListItem>
            ))}
          </UnorderedList>

          <Flex alignItems="center" mt={4}>
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
        </Box>

        <Flex justifyContent="space-between">
          <Button onClick={handleCreateCard} colorScheme="teal" type="button">
            Create Card
          </Button>

          <Button onClick={() => setSelectedCard(null)} colorScheme="red">
            Cancel
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default CreateCardComponent;
