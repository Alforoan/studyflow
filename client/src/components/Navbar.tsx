import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useStateReset from "../hooks/useStateReset";
import { Link } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { FaWandMagicSparkles } from "react-icons/fa6";

import {
  Box,
  Flex,
  Avatar,
  // HStack,
  // Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Tooltip,
} from "@chakra-ui/react";
import {
  AddIcon,
  Search2Icon,
  CloseIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { PiBooksFill } from "react-icons/pi";
import { IoHome } from "react-icons/io5";

const Navbar: React.FC = () => {
  //const { isOpen, onOpen, onClose } = useDisclosure();
  // const links = useAuthLinks();
  // const location = useLocation();
  // const [activeLink, setActiveLink] = useState(location.pathname);
  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { resetState } = useStateReset();

  const tooltipLabel = colorMode === "light" ? "Dark Mode" : "Light Mode";

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        borderBottom="1px"
        borderColor="gray.100"
        className="transition-all duration-500 ease-in-out"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex alignItems="center">
            {isAuthenticated && (
              <IconButton
                aria-label={"Open Menu"}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                display={{ md: "none" }}
                onClick={isOpen ? onClose : onOpen}
                mr={2}
              />
            )}
            <Link
              to="/home"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
              onClick={() => resetState()}
            >
              <PiBooksFill
                size={32}
                color={useColorModeValue("black", "white")}
              />
              <Box
                ml={2}
                fontSize="xl"
                fontWeight="bold"
                className="font-primary"
                color={useColorModeValue("black", "white")}
                display={{ base: "none", sm: "block" }}
              >
                StudyFlow
              </Box>
            </Link>
          </Flex>
          <Flex alignItems={"center"}>
            {isAuthenticated ? (
              <>
                <Tooltip label="Home" aria-label="home icon button">
                  <Button
                    variant={"solid"}
                    bg="orange.500"
                    _hover={{ bg: "orange.600" }}
                    color="white"
                    size={"sm"}
                    mr={{ base: "2", md: "4" }}
                    as={Link}
                    to={"/"}
                    onClick={() => resetState()}
                    aria-label="home icon"
                  >
                    <IoHome />
                  </Button>
                </Tooltip>
                <Tooltip label="Magic Wand" aria-label="magic wand icon button">
                  <Button
                    variant={"solid"}
                    bg="pink.500"
                    _hover={{ bg: "pink.600" }}
                    color="white"
                    size={"sm"}
                    mr={{ base: "2", md: "4" }}
                    as={Link}
                    to={"/generate"}
                    onClick={() => resetState()}
                  >
                    <FaWandMagicSparkles />
                  </Button>
                </Tooltip>
                <Flex display={{ base: "none", md: "flex" }}>
                  <Button
                    variant={"solid"}
                    colorScheme={"teal"}
                    size={"sm"}
                    mr={4}
                    leftIcon={<Search2Icon />}
                    as={Link}
                    to={"/templates"}
                    onClick={() => resetState()}
                  >
                    Find A Template
                  </Button>
                  <Button
                    variant={"solid"}
                    colorScheme={"blue"}
                    size={"sm"}
                    mr={2}
                    leftIcon={<AddIcon />}
                    as={Link}
                    to={"/new"}
                    onClick={() => resetState()}
                  >
                    Create New Board
                  </Button>
                </Flex>
                <Tooltip
                  label={tooltipLabel}
                  aria-label="light-dark mode toggle button"
                >
                  <Button onClick={toggleColorMode} mr={2}>
                    {colorMode === "light" ? (
                      <Brightness4Icon />
                    ) : (
                      <Brightness7Icon />
                    )}
                  </Button>
                </Tooltip>
                <Menu>
                  <Tooltip
                    label={`Account: ${user?.name}`}
                    aria-label="account-menu icon button"
                  >
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                      aria-label="user icon"
                    >
                      <Avatar size={"sm"} src={user?.picture} />
                    </MenuButton>
                  </Tooltip>
                  <MenuList>
                    <MenuItem
                      as={Link}
                      to="/uploads"
                      onClick={() => resetState()}
                    >
                      Uploaded Templates
                    </MenuItem>
                    <MenuItem
                      as={Link}
                      to="/account"
                      onClick={() => resetState()}
                    >
                      Account
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      className="text-red-600"
                      onClick={() => {
                        logout({
                          logoutParams: { returnTo: window.location.origin },
                        });
                        localStorage.removeItem("jwt");
                      }}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <Stack
                flex={{ base: 1, md: 0 }}
                justify={"flex-end"}
                direction={"row"}
                spacing={6}
              >
                <Button
                  variant={"link"}
                  colorScheme={"blue"}
                  size={"md"}
                  mr={2}
                  onClick={() => loginWithRedirect()}
                >
                  Sign In
                </Button>
                <Button
                  variant={"solid"}
                  colorScheme={"blue"}
                  size={"md"}
                  onClick={() => loginWithRedirect()}
                  display={{ base: "none", md: "inline-flex" }}
                >
                  Sign Up
                </Button>
                <Tooltip
                  label={tooltipLabel}
                  aria-label="light-dark mode toggle button"
                >
                  <Button onClick={toggleColorMode} mr={2}>
                    {colorMode === "light" ? (
                      <Brightness4Icon />
                    ) : (
                      <Brightness7Icon />
                    )}
                  </Button>
                </Tooltip>
              </Stack>
            )}
          </Flex>
        </Flex>

        {isOpen && (
          <Box pb={4} pt={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Button
                variant={"solid"}
                colorScheme={"teal"}
                size={"sm"}
                leftIcon={<Search2Icon />}
                as={Link}
                to={"/templates"}
                onClick={() => resetState()}
              >
                Find A Template
              </Button>
              <Button
                variant={"solid"}
                colorScheme={"blue"}
                size={"sm"}
                leftIcon={<AddIcon />}
                as={Link}
                to={"/new"}
                onClick={() => resetState()}
              >
                Create New Board
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Navbar;
