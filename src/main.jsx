import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const MANTINE_PRIMARY_COLOR = [
  "#f4fbfb",
  "#ddf2f1",
  "#c3e8e7",
  "#a7dddb",
  "#86d1ce",
  "#61c2bf",
  "#33b1ad",
  "#009994",
  "#007975",
  "#004745",
];

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider
      theme={{
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
