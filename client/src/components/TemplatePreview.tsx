import React, { useState } from "react";
import { Template } from "../types";
import { useTemplates } from "../context/TemplateContext";
import { useBoard } from "../context/BoardContext";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  IconButton,
  Flex,
  Text,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import {
  // DeleteIcon,
  CopyIcon,
  DownloadIcon,
  TimeIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons"; // Assuming these icons replace the previous ones
// import { FaRegUserCircle } from "react-icons/fa";
// import Loading from "./Loading";
import DeleteModal from "./DeleteModal";
import { useDeleteBoard } from "../hooks/useAPI";

interface TemplatePreviewProps {
  template: Template;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ template }) => {
  const {
    setIsTemplate,
    setUserTemplates,
    templateIsOwned,
    setUploadedTemplateNames,
    userTemplates,
  } = useTemplates();
  const { setSelectedBoard, setIsSearching } = useBoard();

  const [isConfirmingDelete, setIsConfirmingDelete] = useState<boolean>(false);

  const { deleteBoard } = useDeleteBoard();
  const { setIsToastSuccess } = useBoard();

  const authorName = template.author.split("@")[0];

  const handleClickTemplate = () => {
    if (isConfirmingDelete) return;
    console.log(template.name);
    setSelectedBoard(template);
    setIsTemplate(true);
    setIsSearching(false);
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

    return output;
  }

  const getTotalLength = () => {
    let total = 0;
    template.cards.forEach((card) => {
      total += card.details.timeEstimate ?? 0;
    });

    return minConverter(total);
  };

  const handleClickDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirmingDelete(true);
  };

  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
    console.log("canceling delete");
  };

  const handleConfirmDelete = async () => {
    console.log("confirming delete");

    await deleteBoard(template.uuid, true);
    setSelectedBoard(null);
    setIsToastSuccess("Template deleted successfully");
    setTimeout(() => {
      setIsToastSuccess("");
    }, 1000);

    setUserTemplates((prev) =>
      prev.filter((temp: Template) => temp.uuid !== template.uuid)
    );
    setUploadedTemplateNames(
      userTemplates
        .map((temp) => (temp.uuid !== template.uuid ? temp.name : undefined))
        .filter((name): name is string => name !== undefined)
    );
    setIsConfirmingDelete(false);
  };

  return (
    <Card
      onClick={() => handleClickTemplate()}
      bg={useColorModeValue("gray.100", "whiteAlpha.900")}
      border="1px"
      borderColor={useColorModeValue("gray.300", "gray.600")}
      shadow="sm"
      rounded="md"
      cursor="pointer"
      transitionProperty="background-color"
      transitionDuration="0.2s"
      transitionTimingFunction="ease-in-out"
      _hover={{ bg: "gray.200" }}
      h="200px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      color={useColorModeValue("blackAlpha.900", "blackAlpha.900")}
    >
      <CardHeader position="relative" pb={1}>
        <Heading size="md" textAlign="left" w="80%" mb={0}>
          {template.name}
        </Heading>

        {templateIsOwned && (
          <IconButton
            aria-label="Delete Template"
            color="black"
            icon={<SmallCloseIcon />}
            size="sm"
            position="absolute"
            top={2}
            right={2}
            onClick={(e) => {
              e.stopPropagation();
              handleClickDelete(e);
            }}
          />
        )}
      </CardHeader>
      <CardBody py={0} my={0}>
        <Text
          fontSize="sm"
          fontWeight="3400"
          display="flex"
          alignItems="center"
          mb={0}
        >
          by {authorName}
        </Text>
      </CardBody>

      <CardFooter pt={0} pb={2} w="100%">
        <Flex direction="column" alignItems="flex-start" w="100%" gap={2}>
          <Box
            borderTop="1px solid #A0AEC0"
            borderBottom="1px solid #A0AEC0"
            w="100%"
            py={2}
          >
            <Text
              display="flex"
              fontSize="sm"
              fontWeight={600}
              alignItems="center"
              mb={0}
            >
              <DownloadIcon mr={2} /> {template.downloads} Downloads
            </Text>
          </Box>
          <Box w="100%">
            <Text
              display="flex"
              fontSize="sm"
              fontWeight={600}
              alignItems="center"
              mb={0}
            >
              <CopyIcon mr={2} />{" "}
              {template.cards!.filter((card) => card.id !== "0").length} Cards{" "}
              <TimeIcon ml={4} mr={2} /> {getTotalLength()}
            </Text>
          </Box>
        </Flex>
      </CardFooter>

      {isConfirmingDelete && (
        <DeleteModal
          isOpen={isConfirmingDelete}
          onClose={handleCancelDelete}
          onDelete={handleConfirmDelete}
          message="Are you sure you want to delete this template?"
          type="template"
          id={template.uuid}
        />
      )}
    </Card>
  );
};

export default TemplatePreview;
