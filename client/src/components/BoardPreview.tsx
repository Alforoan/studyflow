import React, { useContext } from "react";
import { Board } from "../types";
import { DeleteBoardContext } from "../context/DeleteBoardContext";
import { useBoard } from '../context/BoardContext';

import {
  Card,
  // CardBody,
  CardFooter,
  CardHeader,
  Heading,
  IconButton,
  Flex,
  Text,
  useColorModeValue,
  useColorMode,
  Box,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { SmallCloseIcon, CopyIcon, TimeIcon } from "@chakra-ui/icons";

interface BoardPreviewProps {
  board: Board;
  handleSelectBoard: (board: Board | null) => void;
}

const BoardPreview: React.FC<BoardPreviewProps> = ({
  board,
  handleSelectBoard,
}) => {
  // should show progress bar on this preview
  const {calculateCompletedTime, calculateTotalTime} = useBoard();
  const { deleteBoardModal, setModalOpen } = useContext(DeleteBoardContext);
  const { colorMode } = useColorMode();

  // const calculateCompletedTime = (userBoard: Board) => {
  //   let completed = 0;
  //   userBoard.cards?.forEach((card: any) => {
  //     if (card.column === 'Completed') completed += card.details.timeEstimate?? 0;
  //   });
  //   return completed;
  // }

  // const calculateInProgressTime = (userBoard: Board): number => {
  //   let inProgress = 0;

  //   userBoard.cards?.forEach((card: any) => {
  //     if (card.column === "In Progress" && card.details.checklist?.length > 0) {
  //       const totalChecklistItems = card.details.checklist.length;
  //       const checkedItems = card.details.checklist.filter(
  //         (item: any) => item.checked
  //       ).length;

  //       const proportionOfTime =
  //         (checkedItems / totalChecklistItems) *
  //         (card.details.timeEstimate ?? 0);

  //       inProgress += proportionOfTime;
  //     }
  //   });
  //   if (userBoard.name === "****"){

  //     console.log("userboard AND IN PROGRESS", userBoard, inProgress);
  //   }
    
  //   return inProgress;
  // };

  // const calculateTotalTime = (userBoard: Board): number => {
  //   let totalTime = 0;

  //   userBoard?.cards?.forEach((card: any) => {
  //     totalTime += card?.details?.timeEstimate ?? 0; 
  //   });

  //   return totalTime;
  // };

  const handleClick = (
    e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => {
    e.stopPropagation();
    setModalOpen(true);
    deleteBoardModal(board.uuid);
  };

  function minConverter(minutes: number) {
    let hours: number = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;

    remainingMinutes = Math.round(remainingMinutes / 10) * 10;

    if (remainingMinutes === 60) {
      remainingMinutes = 0;
      hours += 1;
    }

    let output = `${hours}h`;
    if (remainingMinutes > 0) output += ` ${remainingMinutes}m`;
    if (hours > 0) {
      return output;
    } else {
      output = ` ${remainingMinutes}m`;
      return output;
    }
  }

  const getTotalLength = () => {
    let total = 0;
    board.cards?.forEach((card) => {
      total += card.details.timeEstimate ?? 0;
    });

    return minConverter(total);
  };

  return (
    <Card
      onClick={() => handleSelectBoard(board)}
      bg={useColorModeValue("gray.100", "whiteAlpha.900")}
      border="1px"
      borderColor={useColorModeValue("gray.300", "gray.600")}
      shadow="sm"
      rounded="md"
      cursor="pointer"
      transitionProperty="background-color"
      transitionDuration="0.2s"
      transitionTimingFunction="ease-in-out"
      _hover={{ bg: "gray.300" }}
      h="180px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      color={useColorModeValue("blackAlpha.900", "blackAlpha.900")}
    >
      <CardHeader position="relative" pb={1}>
        <Heading size="md" w="80%" textAlign="left" mb={0}>
          {board.name}
        </Heading>

        <IconButton
          aria-label="Delete Template"
          icon={<SmallCloseIcon />}
          size="md"
          position="absolute"
          top={0}
          right={0}
          bg={""}
          color="blackAlpha.900"
          _hover={{}}
          onClick={(e) => {
            e.stopPropagation();
            handleClick(e);
          }}
        />
      </CardHeader>

      <CardFooter pt={0} pb={2} w="100%">
        <Flex direction="column" alignItems="flex-start" w="100%" gap={2}>
          <Box w="100%" borderTop="1px solid #A0AEC0" py={2}>
            <Text
              display="flex"
              flexDirection="row"
              fontSize="sm"
              fontWeight={600}
              alignItems="center"
              mb={0}
            >
              <CopyIcon mr={1} />
              {board.cards!.filter((card) => card.id !== "0").length} Cards
              <TimeIcon ml={6} mr={1} /> {getTotalLength()}
            </Text>
            {board?.cards && (
              <Box display="flex" alignItems="center" ml={2} fontWeight={600}>
                <CircularProgress
                  value={
                    calculateTotalTime(board) > 0
                      ? Math.round(
                          (calculateCompletedTime(board) /
                            calculateTotalTime(board)) *
                            100
                        )
                      : 0
                  }
                  color={colorMode === "light" ? "green.400" : "blue.300"}
                  size="60px"
                  position="absolute"
                  right="10px"
                  bottom="55px"
                  trackColor={"gray.400"}
                >
                  <CircularProgressLabel>
                    {calculateTotalTime(board) > 0
                      ? Math.round(
                          (calculateCompletedTime(board) /
                            calculateTotalTime(board)) *
                            100
                        )
                      : 0}{" "}
                    %
                  </CircularProgressLabel>
                </CircularProgress>
              </Box>
            )}
          </Box>
        </Flex>
      </CardFooter>
    </Card>
    //   <div
    //     onClick={() => handleSelectBoard(board)}
    //     className="bg-secondaryElements border border-secondaryElements-200 p-4 shadow-sm w-48 h-40 flex-col items-center justify-center rounded relative font-primary text-primaryText"
    //     aria-label={`Select board: ${board.name}`}
    //     tabIndex={0}
    //     onKeyDown={(e) => {
    //     if (e.key === 'Enter' || e.key === ' ') handleSelectBoard(board);
    // }}
    //   >
    //     <h1 className="text-center text-primaryText text-lg font-medium pb-8"
    //     aria-label={`Board name: ${board.name}`}
    //     >
    //       {board.name}
    //     </h1>
    //     <div onClick={handleClick} className="absolute top-0 right-0 p-1">
    //       <svg
    //         viewBox="0 0 24 24"
    //         fill="none"
    //         stroke="currentColor"
    //         strokeWidth="2"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer"
    //         aria-label="Delete board"
    //         role="button"
    //         tabIndex={0}
    //         onKeyDown={(e) => {
    //           if (e.key === 'Enter' || e.key === ' ') handleClick(e);
    //         }}
    //       >
    //         <line x1="18" y1="6" x2="6" y2="18" />
    //         <line x1="6" y1="6" x2="18" y2="18" />
    //       </svg>
    //     </div>
    //     <p>Total cards: {board.cards!.length - 1}</p>
    //   </div>
  );
};

export default BoardPreview;
