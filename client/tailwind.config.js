/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "xs": "400px",
      },
      colors: {
        primaryText: "#0F172A",
        primaryTextLighter: "#0F172A80",
        primaryBackground: "#FFFFFF",
        secondaryElements: "#E0DFDD",
        flair: "#006FB2",
        flairSecondary: "#eaf2ff",
        success: "#121212",
        warning: "#F44F4A",
        secondaryConfirm: "#70E5A3",

        // Dark mode colors
        dark: {
          primaryText: "#e0e0e0",
          primaryTextLighter: "#ccc",
          primaryBackground: "#212121",
          secondaryElements: "#2e2e2e",
          flair: "#00bcd4",
          flairSecondary: "#0097a7",
          success: "#e0e0e0",
          warning: "#ff4c4c",
          secondaryConfirm: "#a3e4a3",
        },
      },
      fontFamily: {
        primary: ["Roboto", "Helvetica"],
        secondary: ["Archivo"],
      },
      fontSize: {
        primary: "36px",
      },
    },
  },
  plugins: [],
};
