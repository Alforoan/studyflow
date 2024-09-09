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
  Image,
} from "@chakra-ui/react";
import studyflowImage from "../assets/Studyflow.jpg";
import studyflowMobile from "../assets/Studyflow-Mobile.jpg";
import LandingFeatures from "../components/LandingFeatures";

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
        <Stack spacing={2} textAlign="center" mb={8}>
          <Heading
            as="h1"
            fontSize={{ base: "3xl", lg: "4xl" }}
            fontWeight="bold"
            color={{ light: "gray.800", dark: "gray.200" }}
          >
            Study Smarter With{" "}
            <Text as="span" fontStyle="italic">
              StudyFlow.
            </Text>
          </Heading>
          <Text
            fontSize={{ base: "md", lg: "lg" }}
            mt="2"
            color={{ light: "gray.800", dark: "gray.200" }}
          >
            Create personalized study tracks & get focused on whatever you want
            to learn.
          </Text>
          <Button
            colorScheme={"blue"}
            size="lg"
            onClick={() => loginWithRedirect()}
            mx="auto"
            my={4}
          >
            Get Started with StudyFlow
          </Button>
          <LandingFeatures />
        </Stack>

        {/* Image for mobile */}
        <Box
          display={{ base: "flex", md: "none" }}
          justifyContent="center"
          my={2}
        >
          <Image
            borderTopRadius={8}
            w="80%"
            src={studyflowMobile}
            alt="Studyflow Mobile"
          />
        </Box>

        {/* Image for desktop */}
        <Box
          boxSize={"full"}
          display={{ base: "none", md: "flex" }}
          justifyContent={"center"}
          my={2}
        >
          <Image
            borderTopRadius={8}
            w="80%"
            src={studyflowImage}
            alt="Studyflow"
          />
        </Box>
      </main>
    </Container>
  );
};

export default Landing;
