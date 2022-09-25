const colors = require("tailwindcss/colors");

module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary1: "#016DB2",
      primary2: "#005499",
      primary3: "#003F80",
      secondary1: "#1192E8",
      bg1: "#F2F4F6",
      bg2: "#F2F4F8",
      bg3: "#F6F6F6",
      bg4: "#FBFBFB",
      green: "#4BB543",
      gray: "#C1C7CD",
      gray2: "#C4C4C4",
      darkGray: "#878D96",
      text1: "#444444",
      white: colors.white,
      red: colors.red,
      teal: colors.teal,
      black: colors.black,
    },
    fontFamily: {
      primary: ["IBM Plex Sans", "ui-serif", "Georgia"],
      secondary: ["Inter", "Roboto", "system-ui"],
    },
    plugins: [],
  },
};
