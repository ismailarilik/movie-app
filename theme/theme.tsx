import { createTheme, Theme } from "@mui/material";

const theme: Theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "#0D0D0D",
      default: "#0D0D0D",
    },
    primary: {
      main: "#000",
    },
  },
});

export const gradientBorder = {
  styles: {
    position: "relative",
    background: "transparent",
    color: "#fff",
    backgroundClip: "padding-box",
    border: "solid 4px transparent",
    borderRadius: "0.8rem",
    zIndex: "10",
    "&:before": {
      content: "''",
      position: "absolute",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      zIndex: "-1",
      opacity: "0.9",
      margin: "-10px",
      borderRadius: "inherit",
      background: "linear-gradient(to left, #01b4e4, #90cea1)",
    },
  },
};

export default theme;
