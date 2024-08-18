import { useBoard } from "../context/BoardContext";
import { v4 as uuidv4 } from "uuid";
import { useTemplates } from "../context/TemplateContext";
import ButtonComponent, { ButtonStyle } from "./ButtonComponent";
import { Button, Flex } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const DownloadTemplateComponent = () => {
  const {
    selectedBoard,
    handleDownloadTemplate,
    setIsToastSuccess,
    userBoards,
    setSelectedBoard,
  } = useBoard();
  const { setIsTemplate } = useTemplates();
  const navigate = useNavigate();

  const handlePressDownload = () => {
    console.log(selectedBoard!.name);
    let isUniqueBoard = true;
    userBoards.forEach((board) => {
      if (board.name === selectedBoard!.name) {
        isUniqueBoard = false;
        setIsToastSuccess("Error. You have a board with the same name.");
        setTimeout(() => {
          setIsToastSuccess("");
        }, 1000);
      }
    });
    if (!isUniqueBoard) {
      return;
    } else {
      setIsToastSuccess("You have successfully downloaded the template.");
      setTimeout(() => {
        setIsToastSuccess("");
      }, 1000);
    }

    handleDownloadTemplate({
      ...selectedBoard!,
      uuid: uuidv4(),
    });
    setIsTemplate(false);
    setSelectedBoard(null);
    navigate("/");
  };
  return (
    <Flex mt={4}>
      <Button
        onClick={handlePressDownload}
        bg="gray.500"
        color="white"
        ml={4}
        leftIcon={<DownloadIcon />}
        _hover={{ bg: "gray.600" }}
      >
        Download Template
      </Button>
    </Flex>
  );
};

export default DownloadTemplateComponent;
