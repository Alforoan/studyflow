// EditBoardName.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useBoard } from "../context/BoardContext";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";
import { useTemplates } from "../context/TemplateContext";
import { usePutBoard } from "../hooks/useAPI";
// import ButtonComponent, { ButtonStyle } from "./ButtonComponent";
import { validateTextInput } from "../utils/inputUtils";

import {
  Container,
  Flex,
  Input,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

interface EditBoardNameProps {
  onSuccess?: (updatedName: string) => void; // callback for successful name updates
  onCancel?: () => void; // callback for cancel of edit board name
  setIsEditingTitle: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditBoardName: React.FC<EditBoardNameProps> = ({
  onSuccess,
  setIsEditingTitle,
}) => {
  const {
    selectedBoard,
    setTitleText,
    updateTitleText,
    setIsToastSuccess,
    userBoards,
    setUserBoards,
  } = useBoard();
  const [newName, setNewName] = useState(selectedBoard!.name);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalName, setOriginalName] = useState(selectedBoard!.name); // holds the most recent saved name

  const { putBoard, isLoading, error: apiError } = usePutBoard();
  const { isTemplate } = useTemplates();

  useEffect(() => {
    setNewName(selectedBoard!.name); // sync with board name when in edit mode
    setOriginalName(selectedBoard!.name); // Initialize originalName with the board's current name
  }, [selectedBoard!.name]);

  useEffect(() => {
    setIsEditingTitle(isEditing);
  }, [isEditing]);

  const saveBoardIcon = useBreakpointValue({
    base: undefined,
    md: <CheckIcon />,
  });
  const cancelIcon = useBreakpointValue({ base: undefined, md: <CloseIcon /> });

  const handleEditClick = () => {
    setIsEditing(true);
    setTitleText("");
  };

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setNewName(originalName); // Revert to the most recently saved board name in case of cancel
    updateTitleText();
    setError(null);
  }, [originalName]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCancel();
    };
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleCancel]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
    setError(null); // Clear error when user starts typing
    //console.log("INPUT CHANGE", event.target.value);
  };

  const handleSubmit = async () => {
    const boardName = newName.trim();
    console.log(boardName);

    if (!boardName) {
      setError("Please name your board.");
      return;
    }

    // sanitize and clean the new board name
    const isValidated = validateTextInput(boardName);
    console.log("VALIDATED", isValidated);

    // ensure cleaned board name is not empty
    if (!isValidated || isValidated === null) {
      setError("Please enter a valid board name.");
      return;
    }

    // Check if the board name already exists locally
    if (userBoards.some((board) => board.name === isValidated)) {
      setError("Board name already exists. Please choose another.");
      return;
    }

    try {
      await putBoard(isValidated, selectedBoard!.uuid, isTemplate);
      setIsEditing(false);

      const oldBoards = userBoards.filter(
        (board) => board.name !== originalName
      );
      selectedBoard!.name = isValidated;
      setUserBoards([selectedBoard!, ...oldBoards]);

      setOriginalName(isValidated); // Update originalName with the new name
      if (onSuccess) onSuccess(isValidated); // Call onSuccess callback
      setIsToastSuccess("Board name changed successfully");
      setTimeout(() => {
        setIsToastSuccess("");
      }, 1000);
    } catch (err) {
      if (err) setError(apiError!.message);
    }
    setError(null);
    updateTitleText();
  };

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

  return (
    <>
      {!isEditing ? (
        <Button
          onClick={handleEditClick}
          bg="gray.500"
          color="white"
          ml={4}
          leftIcon={<EditIcon />}
          _hover={{ bg: "gray.600" }}
          justifyContent={{ base: "center", md: "right" }}
          textAlign="center"
        >
          Edit Title
        </Button>
      ) : (
        <Container maxW="5xl" px={{ md: "8", sm: "4" }}>
          <Flex direction="column">
            <Flex direction="row" alignItems="center" mx={0}>
              <Input
                type="text"
                value={newName}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
                fontSize="3xl"
                fontWeight="bold"
                borderColor="gray.400"
                borderWidth={2}
                px={2}
                mr={2}
                bg={isEditing ? "white" : "gray.100"}
                color={isEditing ? "black" : "gray.800"}
                _dark={{
                  bg: isEditing ? "gray.800" : "gray.700",
                  color: isEditing ? "gray.300" : "gray.200",
                }}
                w="78%"
                aria-label="Board Name"
              />
              <Button
                w="10%"
                mr={2}
                bg="teal"
                color="white"
                px={2}
                py={2}
                leftIcon={saveBoardIcon}
                onClick={() => handleSubmit()}
                aria-label="Create New Board Button"
              >
                {saveBoardIcon ? "Save" : <CheckIcon />}
              </Button>
              <Button
                w="12%"
                bg="red.400"
                color="white"
                leftIcon={cancelIcon}
                onClick={handleCancel}
                aria-label="Cancel Button"
              >
                {cancelIcon ? "Cancel" : <CloseIcon />}
              </Button>
            </Flex>
            <ErrorMessage message={error} />
          </Flex>
        </Container>
      )}
    </>
  );
};

export default EditBoardName;
