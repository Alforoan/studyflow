// import React from "react";
// import StackedCards from "../components/StackedCards";
// import { useAuth0 } from "@auth0/auth0-react";
// import { Helmet } from "react-helmet-async";
// import ButtonComponent, { ButtonStyle } from "../components/ButtonComponent";

// const Landing: React.FC = () => {
//   const { loginWithRedirect } = useAuth0();

//   return (
//     <div className="container mx-auto p-8">
//       <Helmet>
//         <title>Welcome to StudyFlow - Organize and Track Your Learning</title>
//       </Helmet>

//       {/* Skip to content link */}
//       <a href="#main-content" className="sr-only focus:not-sr-only">
//         Skip to main content
//       </a>

//       <main id="main-content" role="main" aria-label="Main content">
//         {/* Call to action */}
//         <div className="text-center my-8">
//           <h1 className="text-2xl lg:text-4xl font-bold font-primary text-primaryText">
//             Unlock focused learning. Start your personal{" "}
//             <span className="italic">StudyFlow</span> today.
//           </h1>
//           <div className="text-center my-8">
//             {" "}
//             {/* Call to action section */}
//             <ButtonComponent
//               click={() => loginWithRedirect()}
//               buttonType={ButtonStyle.OuterPrimary}
//               text="Sign Up Here"
//               additionalStyles="mx-auto"
//             />
//           </div>
//         </div>

//         {/* Features and Stacked Cards on larger screens */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:justify-items-center lg:mt-40">
//           {/* Feature descriptions */}
//           <div className="mx-auto max-w-md lg:max-w-none">
//             <div className="mt-4 space-y-8">
//               <div className="p-4 bg-secondaryElements rounded-lg shadow">
//                 <h2 className="font-semibold font-primary text-primaryText text-xl">
//                   Organize notes and links for anything you want to study
//                 </h2>
//               </div>
//               <div className="p-4 bg-secondaryElements rounded-lg shadow">
//                 <h2 className="font-semibold font-primary text-primaryText text-xl">
//                   Track your progress and stay on track
//                 </h2>
//               </div>
//             </div>
//           </div>

//           {/* Stacked Cards Component*/}
//           <div className="lg:w-full">
//             <StackedCards />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Landing;

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
            Unlock focused learning. Start your personal{" "}
            <Text as="span" fontStyle="italic">
              StudyFlow
            </Text>{" "}
            today.
          </Heading>
          <Button
            colorScheme="teal"
            size="lg"
            onClick={() => loginWithRedirect()}
            mx="auto"
          >
            Sign Up Here
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
