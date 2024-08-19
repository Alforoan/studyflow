import { useEffect } from "react";
import TemplateSearchBar from "../components/TemplateSearchBar";
import SearchGrid from "../components/SearchGrid";
import { useBoard } from "../context/BoardContext";
import { Stack, useColorModeValue, Center, Container } from "@chakra-ui/react";
import BoardComponent from "../components/BoardComponent";
import TitleComponent from "../components/TitleComponent";

const Templates = () => {
  const { setIsSearching, selectedBoard, selectedCard } = useBoard();

  useEffect(() => {
    setIsSearching(true);
  }, []);

  return (
    <Container maxW="5xl" px={{ md: "8", sm: "4" }}>
      {selectedBoard ? (
        <>
          <Center mt={8}>{!selectedCard && <TitleComponent />}</Center>
          <BoardComponent />
        </>
      ) : (
        <Stack bg={useColorModeValue("white.100", "gray.800")}>
          <TemplateSearchBar />
          <SearchGrid />
        </Stack>
      )}
    </Container>
  );
};

export default Templates;
