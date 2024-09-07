import { useNavigate } from "react-router-dom";
import { useBoard } from "../context/BoardContext";
import { useTemplates } from "../context/TemplateContext";
import EditBoardName from "./EditBoardName";
// import { MdArrowBack } from "react-icons/md";
import { Heading, Flex, Icon } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import DownloadTemplateComponent from "./DownloadTemplateComponent";
import UploadBoardComponent from "./UploadBoardComponent";
import { useEffect, useState } from "react";
import { useGetCards } from '../hooks/useAPI';

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
  const { getCards } = useGetCards();

  const { isTemplate, setIsTemplate, templateIsOwned, uploadedTemplateNames } =
    useTemplates();

  const handleGoBack = async() => {
    if (!selectedCard && !selectedBoard && isSearching) {
      setIsSearching(false);
      navigate("/home");
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
        const cards = await getCards(selectedBoard.uuid, false);
        
        setSelectedBoard((prevBoard) => {
          const updatedBoard = prevBoard
            ? { ...prevBoard }
            : { ...selectedBoard };

          return {
            ...updatedBoard, 
            cards: cards, 
          };
        });
        navigate("/");
      }
    }
  };

  useEffect(() => {
    console.log("UPLOADED TEMPLATE NAMES", uploadedTemplateNames);
  }, []);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  return (
    <Flex direction="column" alignItems="center" justifyContent="center" mb={4}>
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
          w={{ base: "100%", md: "100%" }}
          textAlign="center"
          mt={4}
          justifyContent="center"
          direction={{ base: "column", md: "row" }}
          gap={{ base: "4", md: "0" }}
          alignItems={"center"}
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

      {selectedBoard && !selectedCard && isTemplate && !templateIsOwned && (
        <DownloadTemplateComponent />
      )}
    </Flex>
  );
};

export default TitleComponent;
