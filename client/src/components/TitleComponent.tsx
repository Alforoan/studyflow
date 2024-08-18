import { useNavigate } from "react-router-dom";
import { useBoard } from "../context/BoardContext";
import { useTemplates } from "../context/TemplateContext";
import EditBoardName from "./EditBoardName";
import { MdArrowBack } from "react-icons/md";
import { Heading, Flex, Icon } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import DownloadTemplateComponent from "./DownloadTemplateComponent";
import UploadBoardComponent from "./UploadBoardComponent";
import { useState } from "react";

const TitleComponent = () => {
  const {
    selectedBoard,
    selectedCard,
    setSelectedBoard,
    setSelectedCard,
    titleText,
    updateTitleText,
    isSearching,
    setIsSearching,
  } = useBoard();

  const navigate = useNavigate();

  const { isTemplate, setIsTemplate, templateIsOwned, uploadedTemplateNames } =
    useTemplates();

  const handleGoBack = () => {
    if (!selectedCard && !selectedBoard && isSearching) {
      setIsSearching(false);
      navigate("/");
      return;
    }

    if (selectedCard) {
      setSelectedCard(null);
    } else if (selectedBoard) {
      setSelectedBoard(null);
      if (isTemplate) {
        setIsTemplate(false);
        setIsSearching(true);
      } else {
        navigate("/");
      }
    }
  };

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  return (
    <Flex direction="column" alignItems="center" justifyContent="center" mb={8}>
      <Heading
        as="h1"
        cursor="pointer"
        fontSize="3xl"
        fontWeight="bold"
        onClick={() => handleGoBack()}
        tabIndex={0}
        aria-label="Go Back"
        textAlign="center"
      >
        <Flex alignItems="center" justifyContent="center">
          {titleText.includes("~") ? (
            <>
              <Icon as={ArrowBackIcon} mr={2} fontSize="2xl" />
              <span>{titleText.split("~")[1]}</span>
            </>
          ) : (
            titleText
          )}
        </Flex>
      </Heading>

      {selectedBoard && !selectedCard && (
        <Flex
          w="40%"
          textAlign="center"
          mt={4}
          justifyContent="center"
          direction={{ base: "column", md: "row" }}
          gap={4}
        >
          {!isTemplate || templateIsOwned ? (
            <EditBoardName
              setIsEditingTitle={setIsEditingTitle}
              onSuccess={(updatedName: string) => {
                setSelectedBoard((prevBoard) => {
                  if (prevBoard) {
                    return { ...prevBoard, name: updatedName };
                  }
                  updateTitleText();
                  return prevBoard;
                });
              }}
            />
          ) : null}

          {!isTemplate &&
          !uploadedTemplateNames.includes(selectedBoard!.name) &&
          selectedBoard.cards?.length &&
          selectedBoard.cards.length > 1 ? (
            <UploadBoardComponent isEditingTitle={isEditingTitle} />
          ) : null}
        </Flex>
      )}

      {selectedBoard && !selectedCard && isTemplate && (
        <DownloadTemplateComponent />
      )}
    </Flex>
  );
};

export default TitleComponent;
