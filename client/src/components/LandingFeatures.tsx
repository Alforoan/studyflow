import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaTasks, FaBrain, FaChalkboardTeacher } from "react-icons/fa";

const LandingFeatures = () => {
  const iconColor = useColorModeValue("blue.400", "blue.200");
  return (
    <Box display="flex" justifyContent={"center"}>
      <SimpleGrid
        columns={[1, 1, 3]}
        spacing={10}
        mt={8}
        mb={4}
        width={{ base: "95%", md: "80%" }}
      >
        <Box textAlign="center">
          <Icon as={FaTasks} w={12} h={12} mb={4} color={iconColor} />
          <Heading size="md" mb={2}>
            Stay Organized with Kanban
          </Heading>
          <Text>
            Break down complex topics into manageable pieces & track your
            progress.
          </Text>
        </Box>

        <Box textAlign="center">
          <Icon as={FaBrain} w={12} h={12} mb={4} color={iconColor} />
          <Heading size="md" mb={2}>
            Generate AI Study Tracks
          </Heading>
          <Text>
            Create one-click dynamic study boards with resources tailored to
            your learning style.
          </Text>
        </Box>

        <Box textAlign="center">
          <Icon
            as={FaChalkboardTeacher}
            w={12}
            h={12}
            mb={4}
            color={iconColor}
          />
          <Heading size="md" mb={2}>
            Join our Learning Community
          </Heading>
          <Text>
            Share & discover study tracks created by other learners in the
            community.
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default LandingFeatures;
