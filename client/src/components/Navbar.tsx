import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Logo from "../assets/logo2.png";
// import LogoLight from "../assets/logo2light.png";
import { useAuth } from "../context/AuthContext";
import { useBoard } from "../context/BoardContext";
import useStateReset from "../hooks/useStateReset";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const { handleHomeClick } = useStateReset();

  return (
    <nav className="bg-secondaryElements p-4 dark:bg-dark-secondaryElements border-b dark:border-dark-primaryText transition-colors duration-500">
      <div className="container mx-auto flex items-center justify-between">
        {/* logo */}
        <div className="flex items-center">
          <Link to="/home" onClick={handleHomeClick}>
          <img src={Logo} width={85} height={50} alt="Logo"/>
          </Link>{" "}
          <div className="text-primaryText dark:text-dark-primaryText font-primary font-bold text-xl ml-8">
            StudyFlow
          </div>
          {isAuthenticated && user && (
            <p className="text-flair font-primary font-bold text-xl ml-8 lg:ml-16 xs:text-md hidden xs:block">
              Hi, {user.given_name ? user.given_name : user.nickname}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="hidden lg:flex space-x-4">
          <AuthButtonsLinks />
        </div>

        {/* Hamburger Menu */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none text-primaryText dark:text-dark-primaryText"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                  // className="stroke-current"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                  // className="stroke-current"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 transform -translate-y-4"
        enterTo="opacity-100 transform translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 transform translate-y-0"
        leaveTo="opacity-0 transform -translate-y-4"
      >
        <div className="lg:hidden flex flex-col items-center justify-center space-y-4 mt-4">
          <div className="flex flex-col space-y-4 mt-4">
            <AuthButtonsLinks />
          </div>
        </div>
      </Transition>
    </nav>
  );
};

const AuthButtonsLinks: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { isAdmin } = useAuth();
  const { handleHomeClick, handleAccountClick } = useStateReset();
  const { setCurrentPage } = useBoard();

  return (
    <>
      {!isAuthenticated ? (
        <>
          <button
            onClick={() => loginWithRedirect()}
            className="text-center font-primary text-primaryText hover:text-primaryTextLighter dark:text-dark-primaryText dark:hover:text-dark-primaryTextLighter"
          >
            Log in
          </button>
          <button
            onClick={() => loginWithRedirect()}
            className="font-primary text-primaryText hover:text-primaryTextLighter dark:text-dark-primaryText dark:hover:text-dark-primaryTextLighter"
          >
            Sign up
          </button>
        </>
      ) : (
        <>
          <Link
            to="/home"
            className="font-primary text-primaryText dark:text-dark-primaryText hover:text-primaryTextLighter dark:hover:text-dark-primaryTextLighter"
            onClick={handleHomeClick}
          >
            Home
          </Link>
          <Link
            to="/account"
            className="font-primary text-primaryText dark:text-dark-primaryText hover:text-primaryTextLighter dark:hover:text-dark-primaryTextLighter"
            onClick={handleAccountClick}
          >
            Account
          </Link>
          {isAdmin ? (
            <Link
              to="/admin_dashboard"
              className="font-primary text-primaryText dark:text-dark-primaryText hover:text-primaryTextLighter dark:hover:text-dark-primaryTextLighter"
              onClick={() => setCurrentPage("Admin Dashboard")}
            >
              Admin Dashboard
            </Link>
          ) : (
            ""
          )}

          <button
            onClick={() => {
              logout({ logoutParams: { returnTo: window.location.origin } });
              localStorage.removeItem("jwt");
            }}
            className="text-left font-primary text-primaryText dark:text-dark-primaryText hover:text-primaryTextLighter dark:hover:text-dark-primaryTextLighter"
          >
            Log out
          </button>
        </>
      )}
    </>
  );
};

export default Navbar;
