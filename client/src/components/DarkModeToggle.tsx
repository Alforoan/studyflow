// DarkModeToggle.tsx
import React, { useState, useEffect } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  return (
    <button
      onClick={handleToggle}
      className="font-primary dark:hover:text-dark-primaryTextLighter hover:text-primaryTextLighter p2 border-none lg:pl-4"
    >
      {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </button>
  );
};

export default DarkModeToggle;
