const colors = require("tailwindcss/colors");

module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary1: "#009D9A",
      primary2: "#007D79",
      primary3: "#005D5D",
      secondary1: "#1192E8",
      bg1: "#F2F4F6",
      bg2: "#F2F4F8",
      green: "#4BB543",
      grey: "#C1C7CD",
      grey2: "#C4C4C4",
      darkGrey: "#878D96",
      gray: colors.gray,
      text1: "#444444",
      white: colors.white,
      red: colors.red,
      teal: colors.teal,
      black: colors.black,
    },
    extend: {
      height: {
        "min-16": "-16rem",
      },
    },
    fontFamily: {
      sans: ["Inter", "Roboto", "system-ui"],
      serif: ["IBM Plex Sans", "ui-serif", "Georgia"],
    },
    plugins: [],
  },
};
