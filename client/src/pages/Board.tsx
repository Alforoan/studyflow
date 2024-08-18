import React from "react";
import BoardComponent from "../components/BoardComponent";
import { Container } from "@chakra-ui/react";
import TitleComponent from "../components/TitleComponent";

const Board: React.FC = () => {
  return (
    <Container maxW="5xl" py={16} px={{ md: "8", sm: "4" }}>
      <TitleComponent />
      <BoardComponent />
    </Container>
  );
};

export default Board;
