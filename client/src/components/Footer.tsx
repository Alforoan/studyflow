import React from "react";
import {
  Tooltip,
  Box,
  IconButton,
  useColorModeValue,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      color={useColorModeValue("gray.800", "gray.200")}
      px={4}
      py={6}
      h={16}
      borderTop="1px"
      borderColor="gray.100"
      className="transition-all duration-500 ease-in-out"
    >
      <Flex direction="row" align="center" justify="space-between" h="100%">
        <Box flex="1" textAlign="left">
          <Box
            fontSize="sm"
            fontWeight="bold"
            color={useColorModeValue("gray.900", "gray.400")}
          >
            &copy; {new Date().getFullYear()} StudyFlow
          </Box>
        </Box>
        <Box>
          <Stack direction="row" spacing={6}>
            <Tooltip label="Coming Soon" aria-label="Facebook Coming Soon">
              <IconButton
                as="a"
                // href="https://facebook.com"
                aria-label="Facebook"
                icon={<FaFacebook />}
                variant="link"
                size="lg"
                _hover={{
                  color: useColorModeValue("facebook.600", "facebook.400"),
                }}
              />
            </Tooltip>
            <Tooltip label="Coming Soon" aria-label="Twitter Coming Soon">
              <IconButton
                as="a"
                // href="https://twitter.com"
                aria-label="Twitter"
                icon={<FaTwitter />}
                variant="link"
                size="lg"
                _hover={{ color: useColorModeValue("blue.600", "blue.400") }}
              />
            </Tooltip>
            <Tooltip label="Coming Soon" aria-label="Instagram Coming Soon">
              <IconButton
                as="a"
                // href="https://instagram.com/"
                aria-label="Instagram"
                icon={<FaInstagram />}
                variant="link"
                size="lg"
                _hover={{ color: useColorModeValue("#C13584", "#C13584") }}
              />
            </Tooltip>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
