import React, { useCallback, useEffect } from "react";
import CreateBoardComponent from "../components/CreateBoardComponent";
import { useBoard } from "../context/BoardContext";
import { Container } from "@chakra-ui/react";
import BoardComponent from "../components/BoardComponent";
import { Board } from "../types";
import { newCard } from "../dummyData";
import { useNavigate } from "react-router-dom";

// const emptyBoard: Board = {
//   name: "",
//   cards: [newCard],
//   uuid: "",
// };

const NewBoard: React.FC = () => {
  const { setIsAddingNewBoard, 
    // setSelectedBoard, 
    // handleAddNewBoard 
  } =
    useBoard();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAddingNewBoard(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsAddingNewBoard(false);
    navigate("/");
  }, []);

  return (
    <Container maxW="5xl" py={16} px={{ md: "8", sm: "4" }}>
      <CreateBoardComponent handleCancel={handleCancel} />
      <BoardComponent />
    </Container>
  );
};

export default NewBoard;
