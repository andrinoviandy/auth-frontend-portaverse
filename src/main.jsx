import NiceModal from "@ebay/nice-modal-react";
import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

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
      <QueryClientProvider client={queryClient}>
        <NiceModal.Provider>
          <App />
        </NiceModal.Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>,
);
