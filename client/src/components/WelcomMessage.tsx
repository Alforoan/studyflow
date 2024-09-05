// WelcomeMessage.tsx
import React from "react";
import { Alert, AlertTitle, CloseButton, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaWandMagicSparkles } from "react-icons/fa6";

interface WelcomeMessageProps {
  showWelcomeMessage: boolean;
  setShowWelcomeMessage: React.Dispatch<React.SetStateAction<boolean>>;
  userBoards: any[];
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({
  showWelcomeMessage,
  setShowWelcomeMessage,
  userBoards,
}) => {
  const navigate = useNavigate();
  if (userBoards.length > 0 || !showWelcomeMessage) return null;

  return (
    <Alert
      status="info"
      mt={4}
      borderRadius="md"
      boxShadow="md"
      position="relative"
    >
      <AlertTitle fontSize={{base: "md", md:"md", lg: "lg"}} p={1}>
      Welcome! To get started on your personalized study plan, click the Magic Wand.{" "}
        <Button
          variant={"solid"}
          bg="pink.500"
          _hover={{ bg: "pink.600" }}
          color="white"
          size={{base: "xs", md:"sm"}}
          ml={1}
          aria-label="Create study plan with Magic Wand"
          onClick={() => navigate('/generate')} 
        >
          <FaWandMagicSparkles />
        </Button>
      </AlertTitle>
      <CloseButton
        position="absolute"
        right="3px"
        top="3px"
        aria-label="Close info alert"
        onClick={() => setShowWelcomeMessage(false)}
      />
    </Alert>
  );
};

export default WelcomeMessage;
