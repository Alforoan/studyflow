/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primaryText: "#0F172A",
				primaryTextLighter: "#0F172A80",
				primaryBackground: "#FFFFFF",
        secondaryElements: "#F6F5F4",
        flair: "#0081F2",
        success: "#121212",
        warning: "#FDBC9B",
			},
			fontFamily: {
				primary: ["Roboto", "Helvetica"],
				secondary: ["Archivo"]
			},
			fontSize: {
				primary: "36px"
			}
		},
	},
	plugins: [],
};
