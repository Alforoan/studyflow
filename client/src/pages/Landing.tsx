import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import StackedCards from "../components/StackedCards";

const Landing: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container maxW="container.xl" py={{ base: 2, sm: 4, md: 4 }}>
      <Helmet>
        <title>Welcome to StudyFlow - Organize and Track Your Learning</title>
      </Helmet>

      {/* Skip to content link */}
      <a href="#main-content" style={{ position: "absolute", left: "-9999px" }}>
        Skip to main content
      </a>

      <main id="main-content" role="main" aria-label="Main content">
        {/* Call to action */}
        <Stack spacing={8} textAlign="center" mb={8}>
          <Heading
            as="h1"
            fontSize={{ base: "2xl", lg: "4xl" }}
            fontWeight="bold"
            color={{ light: "gray.800", dark: "gray.200" }}
          >
            Discover Smarter Ways to Study with{" "}
            <Text as="span" fontStyle="italic">
              StudyFlow.
            </Text>{" "}
          </Heading>
          <Text color={{ light: "gray.800", dark: "gray.200" }}>Join other learners and enhance your study sessions today!</Text>
          <Button
            colorScheme="teal"
            size="lg"
            onClick={() => loginWithRedirect()}
            mx="auto"
          >
            Get Started with StudyFlow
          </Button>
        </Stack>

        {/* Features and Stacked Cards on larger screens */}
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8} mt={{ base: 10, md: 32, lg: 40 }}>
          {/* Feature descriptions */}
          <GridItem>
            <Stack spacing={8}>
              useColorModeValue, useColorModeValue,
              <Box
                p={4}
                bg="gray.100"
                borderRadius="md"
                shadow="md"
                color="blackAlpha.900"
              >
                <Heading as="h2" size="md" fontWeight="semibold">
                  Organize notes and links for anything you want to study
                </Heading>
              </Box>
              <Box
                p={4}
                bg="gray.100"
                borderRadius="md"
                shadow="md"
                color="blackAlpha.900"
              >
                <Heading as="h2" size="md" fontWeight="semibold">
                  Track your progress and stay on track
                </Heading>
              </Box>
            </Stack>
          </GridItem>

          {/* Stacked Cards Component */}
          <GridItem mt={{ base: 6 }}>
            <StackedCards />
          </GridItem>
        </Grid>
      </main>
    </Container>
  );
};

export default Landing;
