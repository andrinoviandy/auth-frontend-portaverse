import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const MANTINE_PRIMARY_COLOR = [
  "#CBEBFF",
  "#88D2FF",
  "#4EBCFF",
  "#1CA9FF",
  "#0096F9",
  "#0080D3",
  "#016DB2",
  "#005B96",
  "#004C7D",
  "#003F68",
  "#003456",
];

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider
      emotionOptions={{ key: "mantine", prepend: false }}
      theme={{
        fontFamily: "Inter, Roboto, system-ui",
        colors: {
          primary: MANTINE_PRIMARY_COLOR,
        },
        primaryColor: "primary",
      }}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
