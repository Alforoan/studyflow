/** @type {import('tailwindcss').Config} */
export default {
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
        secondaryElements: "#F6F5F4",
        flair: "#006FB2",
        flairSecondary: "#eaf2ff",
        success: "#121212",
        warning: "#F44F4A",
        secondaryConfirm: "#70E5A3",
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
