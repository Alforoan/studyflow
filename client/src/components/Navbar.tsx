// import React, { useState } from "react";
// import { Transition } from "@headlessui/react";
// import { Link } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
// import Logo from "../assets/logo2.png";
// // import LogoLight from "../assets/logo2light.png";
// import { useAuth } from "../context/AuthContext";
// import { useBoard } from "../context/BoardContext";
// import useStateReset from "../hooks/useStateReset";

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { user, isAuthenticated } = useAuth0();
//   const { handleHomeClick } = useStateReset();

//   return (
//     <nav className="bg-secondaryElements p-4 dark:bg-dark-secondaryElements border-b dark:border-dark-primaryText transition-colors duration-500">
//       <div className="container mx-auto flex items-center justify-between">
//         {/* logo */}
//         <div className="flex items-center">
//           <Link to="/home" onClick={handleHomeClick}>
//           <img src={Logo} width={85} height={50} alt="Logo"/>
//           </Link>{" "}
//           <div className="text-primaryText dark:text-dark-primaryText font-primary font-bold text-xl ml-8">
//             StudyFlow
//           </div>
//           {isAuthenticated && user && (
//             <p className="text-flair font-primary font-bold text-xl ml-8 lg:ml-16 xs:text-md hidden xs:block">
//               Hi, {user.given_name ? user.given_name : user.nickname}
//             </p>
//           )}
//         </div>

//         {/* Links */}
//         <div className="hidden lg:flex space-x-4">
//           <AuthButtonsLinks />
//         </div>

//         {/* Hamburger Menu */}
//         <div className="lg:hidden">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="focus:outline-none text-primaryText dark:text-dark-primaryText"
//             aria-label="Toggle navigation menu"
//           >
//             {isOpen ? (
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                   // className="stroke-current"
//                 ></path>
//               </svg>
//             ) : (
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16m-7 6h7"
//                   // className="stroke-current"
//                 ></path>
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <Transition
//         show={isOpen}
//         enter="transition ease-out duration-200"
//         enterFrom="opacity-0 transform -translate-y-4"
//         enterTo="opacity-100 transform translate-y-0"
//         leave="transition ease-in duration-150"
//         leaveFrom="opacity-100 transform translate-y-0"
//         leaveTo="opacity-0 transform -translate-y-4"
//       >
//         <div className="lg:hidden flex flex-col items-center justify-center space-y-4 mt-4">
//           <div className="flex flex-col space-y-4 mt-4">
//             <AuthButtonsLinks />
//           </div>
//         </div>
//       </Transition>
//     </nav>
//   );
// };

// const AuthButtonsLinks: React.FC = () => {
//   const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
//   const { isAdmin } = useAuth();
//   const { handleHomeClick, handleAccountClick } = useStateReset();
//   const { setCurrentPage } = useBoard();

//   return (
//     <>
//       {!isAuthenticated ? (
//         <>
//           <button
//             onClick={() => loginWithRedirect()}
//             className="text-center font-primary text-primaryText hover:text-primaryTextLighter dark:text-dark-primaryText dark:hover:text-dark-primaryTextLighter"
//           >
//             Log in
//           </button>
//           <button
//             onClick={() => loginWithRedirect()}
//             className="font-primary text-primaryText hover:text-primaryTextLighter dark:text-dark-primaryText dark:hover:text-dark-primaryTextLighter"
//           >
//             Sign up
//           </button>
//         </>
//       ) : (
//         <>
//           <Link
//             to="/home"
//             className="font-primary text-primaryText dark:text-dark-primaryText hover:text-primaryTextLighter dark:hover:text-dark-primaryTextLighter"
//             onClick={handleHomeClick}
//           >
//             Home
//           </Link>
//           <Link
//             to="/account"
//             className="font-primary text-primaryText dark:text-dark-primaryText hover:text-primaryTextLighter dark:hover:text-dark-primaryTextLighter"
//             onClick={handleAccountClick}
//           >
//             Account
//           </Link>
//           {isAdmin ? (
//             <Link
//               to="/admin_dashboard"
//               className="font-primary text-primaryText dark:text-dark-primaryText hover:text-primaryTextLighter dark:hover:text-dark-primaryTextLighter"
//               onClick={() => setCurrentPage("Admin Dashboard")}
//             >
//               Admin Dashboard
//             </Link>
//           ) : (
//             ""
//           )}

//           <button
//             onClick={() => {
//               logout({ logoutParams: { returnTo: window.location.origin } });
//               localStorage.removeItem("jwt");
//             }}
//             className="text-left font-primary text-primaryText dark:text-dark-primaryText hover:text-primaryTextLighter dark:hover:text-dark-primaryTextLighter"
//           >
//             Log out
//           </button>
//         </>
//       )}
//     </>
//   );
// };
import React from "react";
// import { useAuth } from "../context/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
// import { useBoard } from "../context/BoardContext";
import useStateReset from "../hooks/useStateReset";
import { Link } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

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
  // Image,
  useColorMode,
} from "@chakra-ui/react";
import {
  AddIcon,
  Search2Icon,
  // MoonIcon,
  // SunIcon,
  CloseIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
// import Logo from "../assets/noun-study-logo2.png";
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

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} borderBottom="1px" borderColor="gray.100" className="transition-all duration-500 ease-in-out">
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
              >
                StudyFlow
              </Box>
            </Link>
          </Flex>

          <Flex alignItems={"center"}>
            {isAuthenticated ? (
              <>
                <Button
                  variant={"solid"}
                  bg="orange.500"
                  _hover={{ "bg": "orange.600" }}
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
                <Button onClick={toggleColorMode} mr={2}>
                  {colorMode === "light" ? (
                    <Brightness4Icon />
                  ) : (
                    <Brightness7Icon />
                  )}
                </Button>
                <Menu>
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
                >
                  Sign Up
                </Button>
                <Button onClick={toggleColorMode} mr={2}>
                  {colorMode === "light" ? (
                    <Brightness4Icon />
                  ) : (
                    <Brightness7Icon />
                  )}
                </Button>
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

// const useAuthLinks = () => {
//   const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
//   const { isAdmin } = useAuth();
//   const { handleHomeClick, handleAccountClick } = useStateReset();
//   const { setCurrentPage } = useBoard();

//   if (!isAuthenticated) {
//     return [
//       {
//         label: "Log in",
//         link: "#",
//         onClick: () => loginWithRedirect(),
//       },
//       {
//         label: "Sign up",
//         link: "#",
//         onClick: () => loginWithRedirect(),
//       },
//     ];
//   } else {
//     const links = [
//       {
//         label: "Home",
//         link: "/home",
//         onClick: handleHomeClick,
//       },
//       {
//         label: "Account",
//         link: "/account",
//         onClick: handleAccountClick,
//       },
//     ];

//     if (isAdmin) {
//       links.push({
//         label: "Admin Dashboard",
//         link: "/admin_dashboard",
//         onClick: () => setCurrentPage("Admin Dashboard"),
//       });
//     }

//     links.push({
//       label: "Log out",
//       link: "#",
//       onClick: () => {
//         logout({ logoutParams: { returnTo: window.location.origin } });
//         localStorage.removeItem("jwt");
//       },
//     });

//     return links;
//   }
// };
