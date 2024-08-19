import { useBoard } from "../context/BoardContext";
import BoardComponent from "../components/BoardComponent";
import UserTemplatesGrid from "../components/UserTemplatesGrid";
import Loading from "../components/Loading";
import { Heading, useColorModeValue, Container } from "@chakra-ui/react";
import TitleComponent from "../components/TitleComponent";

const UserTemplates = () => {
  const { selectedBoard, isLoading, selectedCard } = useBoard();
  return (
    <Container maxW="5xl" pt={8} px={{ md: "8", sm: "4" }}>
      {selectedBoard ? (
        <>
          {!selectedCard && <TitleComponent />}
          <BoardComponent />
        </>
      ) : isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <>
          <Heading
            as="h4"
            size="lg"
            fontWeight="bold"
            mt={8}
            mb={8}
            textAlign="center"
            color={useColorModeValue("gray.800", "gray.200")}
          >
            Your Templates
          </Heading>
          <UserTemplatesGrid />
        </>
      )}
    </Container>
  );
};

export default UserTemplates;
