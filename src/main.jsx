import NiceModal from "@ebay/nice-modal-react";
import { Icon } from "@iconify/react";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  persistedStore,
  store,
  unpersistedStore,
} from "./Configs/Redux/store";
import { unpersistedStoreContext } from "./Contexts/ReduxContext";

import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

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

const myCache = createEmotionCache({ key: "mantine" });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const MantineCompDefaultProps = {
  Select: {
    rightSection: <Icon icon="akar-icons:chevron-down" width={12} />,
    styles: { rightSection: { pointerEvents: "none" } },
  },
  DatePicker: {
    rightSection: (
      <Icon
        icon="ic:round-date-range"
        color="#C1C7CD"
        width={24}
        className="mr-2"
      />
    ),
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Provider
        store={unpersistedStore}
        context={unpersistedStoreContext}
      >
        <PersistGate loading={null} persistor={persistedStore}>
          <MantineProvider
            emotionCache={myCache}
            theme={{
              fontFamily: "Inter, Roboto, system-ui",
              colors: {
                primary: MANTINE_PRIMARY_COLOR,
              },
              primaryColor: "primary",
              respectReducedMotion: true,
              components: {
                Select: {
                  defaultProps: MantineCompDefaultProps.Select,
                },
                DatePicker: {
                  defaultProps: MantineCompDefaultProps.DatePicker,
                },
              },
            }}
          >
            <QueryClientProvider client={queryClient}>
              <NiceModal.Provider>
                <App />
              </NiceModal.Provider>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </MantineProvider>
        </PersistGate>
      </Provider>
    </Provider>
  </React.StrictMode>,
);
