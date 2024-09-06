import React, { useEffect, useState } from "react";
import { Board } from "../types";
import { v4 as uuidv4 } from "uuid";
import { useBoard } from "../context/BoardContext";
import ErrorMessage from "./ErrorMessage";
import { validateTextInput } from "../utils/inputUtils";
import { Flex, Input, Button, Text, Box } from "@chakra-ui/react";
import { AddIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useBreakpointValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaWandMagicSparkles } from "react-icons/fa6";

interface CreateBoardComponentProps {
  handleCancel: () => void;
}

const emptyBoard: Board = {
  name: "",
  cards: [],
  uuid: "",
};

const CreateBoardComponent: React.FC<CreateBoardComponentProps> = ({
  handleCancel,
}) => {
  const [newBoard, setNewBoard] = useState<Board>(emptyBoard);
  const [error, setError] = useState<string | null>(null);
  const { handleAddNewBoard, userBoards, setIsToastSuccess } = useBoard();

  const navigate = useNavigate();

  useEffect(() => {
    setNewBoard((prevBoard) => ({
      ...prevBoard,
      uuid: uuidv4(),
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBoard((prevBoard) => ({
      ...prevBoard,
      name: e.target.value,
    }));
    setError(null); // Clear error when user starts typing
  };

  const handleGenerate = () => {
    navigate("/generate");
  };

  const handleSubmit = () => {
    const boardName = newBoard.name.trim();

    if (!boardName) {
      setError("Please name your board.");
      return;
    }

    // sanitize and clean the board name
    const isValidated = validateTextInput(boardName);

    // ensure cleaned board name is not empty
    if (!isValidated) {
      setError("Please enter a valid board name.");
      return;
    }

    // Check if the board name already exists locally
    if (userBoards.some((board) => board.name === isValidated)) {
      setError("Board name already exists. Please choose another.");
      return;
    }

    try {
      handleAddNewBoard({ ...newBoard, name: isValidated });
      navigate("/board");
      setIsToastSuccess("Board added successfully");
      setTimeout(() => {
        setIsToastSuccess("");
      }, 1000);
    } catch (err) {
      setError("Failed to create board. Please try again later.");
    }
  };

  const createBoardIcon = useBreakpointValue({
    base: undefined,
    md: <CheckIcon />,
  });
  const cancelIcon = useBreakpointValue({ base: undefined, md: <CloseIcon /> });
  const generateIcon = useBreakpointValue({
    base: undefined,
    md: <FaWandMagicSparkles />,
  });
  return (
    <Flex direction="column" mb={4}>
      <Button
        w="100%"
        mr={2}
        bg="pink.500"
        color="white"
        px={2}
        py={2}
        _hover={{ bg: "pink.700" }}
        leftIcon={generateIcon}
        onClick={() => handleGenerate()}
        aria-label="Generate With AI Button"
        alignSelf={"center"}
      >
        Generate AI Board
      </Button>
      <Flex direction="row" alignItems="center" justifyContent="center" my={8}>
        <Box flex={1} height="1px" bg="gray.400" />
        <Text textAlign="center" fontSize="md" fontWeight="normal" mx={8}>
          Or Start From Scratch
        </Text>
        <Box flex={1} height="1px" bg="gray.400" />
      </Flex>
      <Flex direction="row" mb={4}>
        <Input
          p={2}
          borderRadius="md"
          mr={2}
          w="70%"
          borderColor={"gray.400"}
          borderWidth={2}
          placeholder="Board Name"
          value={newBoard.name}
          onChange={handleChange}
          maxLength={30}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          aria-label="Board Name Input"
        />
        <Button
          w="18%"
          mr={2}
          bg="teal"
          color="white"
          px={2}
          py={2}
          leftIcon={createBoardIcon}
          onClick={() => handleSubmit()}
          aria-label="Create New Board Button"
          _hover={{ bg: "teal.700" }}
        >
          {createBoardIcon ? "Create Board" : <CheckIcon />}
        </Button>

        <Button
          w="10%"
          bg="red.400"
          color="white"
          leftIcon={cancelIcon}
          onClick={handleCancel}
          aria-label="Cancel Button"
          _hover={{ bg: "red.600" }}
        >
          {cancelIcon ? "Cancel" : <CloseIcon />}
        </Button>
      </Flex>
      <ErrorMessage message={error} />
    </Flex>
  );
};

export default CreateBoardComponent;
