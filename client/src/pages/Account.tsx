import React, { useEffect } from "react";
import Profile from "../components/Profile";
import PassChange from "../components/PassChange";
import { useBoard } from "../context/BoardContext";
import { useTemplates } from "../context/TemplateContext";
import Analytics from "../components/AnalyticsComponent";
import { Helmet } from "react-helmet-async";

import {
  Box,
  Container,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

const Account: React.FC = () => {
  const { selectedBoard, setCurrentPage, selectedCard, updateTitleText } =
    useBoard();

  const { setTemplateIsOwned } = useTemplates();

  useEffect(() => {
    setCurrentPage("Account");
  }, []);

  useEffect(() => {
    updateTitleText();
    if (selectedBoard) {
      setTemplateIsOwned(true);
    } else {
      setTemplateIsOwned(false);
    }
  }, [selectedBoard, selectedCard]);

  return (
    <Container maxW="3xl" centerContent px={{ md: "8", sm: "4" }}>
      <Helmet>
        <title>StudyFlow - My Account</title>
      </Helmet>

      <Flex alignItems="center" mt={12}>
        <Heading
          as="h4"
          size="lg"
          fontWeight="bold"
          mt={8}
          mb={4}
          textAlign="center"
          color={useColorModeValue("gray.800", "gray.200")}
        >
          Account
        </Heading>
      </Flex>

      <Box as="main" w="full">
        <Profile />

        <Flex w="full" justifyContent="center" mt={8}>
          <Box
            w="full"
            maxW="lg"
            bg={useColorModeValue("gray.100", "gray.700")}
            borderRadius="lg"
            p={2}
          >
            <Flex
              direction={{ base: "column", md: "row" }}
              alignItems="center"
              justify="evenly"
              gap={4}
            >
              <PassChange />
            </Flex>
          </Box>
        </Flex>

        <Analytics />
      </Box>
    </Container>
  );
};

export default Account;
