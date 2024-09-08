import React from "react";
import BoardComponent from "../components/BoardComponent";
import { Container } from "@chakra-ui/react";
import TitleComponent from "../components/TitleComponent";
import { useBoard } from "../context/BoardContext";

const Board: React.FC = () => {
  const { selectedCard } = useBoard();
  
  return (
    <Container maxW="5xl" pt={8} px={{ md: "8", sm: "4" }}>
      {!selectedCard && <TitleComponent />}
      <BoardComponent />
    </Container>
  );
};

export default Board;
