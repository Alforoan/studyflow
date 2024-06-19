import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Logo from "../assets/noun-study-logo2.png";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  // Function to handle logout
  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  // Function to handle login
  const handleLogin = () => {
    loginWithRedirect();
  };

  // Function to handle register
  const handleRegister = () => {
    loginWithRedirect();
  };

  return (
    <nav className="bg-secondaryElements p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* logo */}
        <div className="container flex items-center w-1/5">
          <img src={Logo} alt="Logo" className="size-16" />
          <div className="text-primaryText font-primary font-bold text-xl ml-8">
            StudyFlow
          </div>
        </div>

        {/* Links */}
        <div className="hidden lg:flex space-x-4">
          {!isAuthenticated && (
            <>
              <button
                onClick={handleLogin}
                className="font-primary text-primaryText hover:text-primaryTextLighter"
              >
                Log in
              </button>
              <button
                onClick={handleRegister}
                className="font-primary text-primaryText hover:text-primaryTextLighter"
              >
                Sign up
              </button>
            </>
          )}
          {isAuthenticated && (
            <>
              <Link
                to="/home"
                className="font-primary text-primaryText hover:text-primaryTextLighter"
              >
                Home
              </Link>
              <Link
                to="/account"
                className="font-primary text-primaryText hover:text-primaryTextLighter"
              >
                Account
              </Link>
              <button
                onClick={handleLogout}
                className="font-primary text-primaryText hover:text-primaryTextLighter"
              >
                Log out
              </button>
            </>
          )}
        </div>

        {/* Hamburger Menu */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6 text-primaryText"
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
                  className="stroke-current"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-primaryText"
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
                  className="stroke-current"
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
            {!isAuthenticated && (
              <>
                <button
                  onClick={handleLogin}
                  className="text-primaryText hover:text-primaryTextLighter"
                >
                  Log in
                </button>
                <button
                  onClick={handleRegister}
                  className="text-primaryText hover:text-primaryTextLighter"
                >
                  Sign up
                </button>
              </>
            )}
            {isAuthenticated && (
              <>
                <Link
                  to="/home"
                  className="text-primaryText hover:text-primaryTextLighter"
                >
                  Home
                </Link>
                <Link
                  to="/account"
                  className="text-primaryText hover:text-primaryTextLighter"
                >
                  Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-primaryText hover:text-primaryTextLighter"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </Transition>
    </nav>
  );
};

export default Navbar;
