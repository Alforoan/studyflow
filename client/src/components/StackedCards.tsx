//StackedCards.tsx
import React from "react";
import { Box, Flex, Heading, List, ListItem, Text } from "@chakra-ui/react";

const StackedCards: React.FC = () => {
  return (
    <Flex
      position="relative"
      justify="center"
      align="center"
      color="primaryText"
      pb={8}
      mb={5}
    >
      <Box position="relative">
        <Box
          position="absolute"
          zIndex={0}
          p={4}
          w={{ base: "100%", md: "18rem", lg: "19rem" }}
          shadow="md"
          rounded="lg"
          top={{ base: "4rem", md: "2rem", lg: "3rem" }}
          left={{ base: "-2rem", md: "-7rem", lg: "-4rem" }}
          bg="#FEFCBF"
          color="gray.800"
        >
          <Heading as="h2" size="md" mb={2}>
            Quick Sort
          </Heading>
          <List styleType="disc" pl={4}>
            <ListItem>YouTube Resource</ListItem>
            <ListItem>Blog Post Walkthrough</ListItem>
            <ListItem>LeetCode Problem</ListItem>
          </List>
          <Text mt={4}>Notes: Google Doc Notes Link</Text>
          <Text mt={1}>Time Estimate: 90 Minutes</Text>
          <Text mt={1}>Column: Backlog</Text>
        </Box>

        <Box
          position="relative"
          zIndex={10}
          p={4}
          w={{ base: "100%", md: "18rem", lg: "19rem" }}
          shadow="md"
          rounded="lg"
          right={{ base: "-2rem", md: "-7rem", lg: "-5rem" }}
          top={{ base: "-.75rem", lg: "-10rem" }}
          bg="#bee3f8"
          color="gray.800"
        >
          <Heading as="h2" size="md" mb={2}>
            Merge Sort
          </Heading>
          <List styleType="disc" pl={4}>
            <ListItem>YouTube Resource</ListItem>
            <ListItem>Blog Post Walkthrough</ListItem>
            <ListItem>LeetCode Problem</ListItem>
          </List>
          <Text mt={4}>Notes: Google Doc Notes Link</Text>
          <Text mt={1}>Time Estimate: 120 Minutes</Text>
          <Text mt={1}>Column: In Progress</Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default StackedCards;