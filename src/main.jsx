import NiceModal from "@ebay/nice-modal-react";
import { Icon } from "@iconify/react";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import dayjs from "dayjs";
import "dayjs/locale/id";
import utc from "dayjs/plugin/utc";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import {
  persistedStore,
  store,
  unpersistedStore,
} from "./Configs/Redux/store";
import "./Configs/Yup";
import { unpersistedStoreContext } from "./Contexts/ReduxContext";
import {
  MANTINE_BUTTON_STYLES,
  MANTINE_INPUT_STYLES,
  MANTINE_SELECT_STYLES,
  MANTINE_SWITCH_STYLES,
} from "./Utils/Constants";
import "./index.css";

dayjs.extend(utc);
dayjs.locale("id");

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
  "#C9F3FB",
];

const MANTINE_BACKGROUND_COLOR = [
  "#F2F4F6",
  "#F2F4F8",
  "#F6F6F6",
  "#FBFBFB",
];

const myCache = createEmotionCache({ key: "mantine" });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const defaultInputStyles = {
  input: {
    ":disabled": {
      opacity: 1,
      color: "black",
    },
  },
};

const MantineCompDefaultProps = {
  Radio: {
    classNames: {
      radio: "cursor-pointer disabled:checked:bg-primary3",
    },
  },
  Checkbox: {
    classNames: {
      input: "cursor-pointer",
    },
  },
  Input: { styles: { ...defaultInputStyles } },
  NumberInput: {
    styles: { ...defaultInputStyles },
    parser: (value) => value.replace(/[^0-9]/g, ""),
    formatter: (value) =>
      !Number.isNaN(parseFloat(value))
        ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        : "",
  },
  Textarea: { styles: { ...defaultInputStyles } },
  TextInput: { styles: { ...defaultInputStyles } },
  Select: {
    rightSection: <Icon icon="akar-icons:chevron-down" width={12} />,
    styles: {
      rightSection: { pointerEvents: "none" },
      ...defaultInputStyles,
    },
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
    styles: { ...defaultInputStyles },
  },
  Button: {
    styles: (theme, params) => ({
      root: {
        borderColor:
          params.variant === "outline" && params.color === "red"
            ? theme.colors.red[8]
            : undefined,
        color:
          params.variant === "outline" && params.color === "red"
            ? theme.colors.red[8]
            : undefined,
        backgroundColor:
          params.variant === "filled" && params.color === "red"
            ? theme.colors.red[8]
            : undefined,
        "&:hover": {
          backgroundColor:
            params.variant === "filled" && params.color === "red"
              ? theme.colors.red[9]
              : undefined,
        },
        "&:disabled": {
          borderColor:
            params.variant === "outline"
              ? theme.colors.gray[5]
              : undefined,
          backgroundColor:
            params.variant === "outline" ? "transparent" : undefined,
        },
        fontSize:
          MANTINE_BUTTON_STYLES.sizeStyles[params.size].fontSize,
      },
    }),
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
                bg: MANTINE_BACKGROUND_COLOR,
              },
              primaryColor: "primary", // key of theme.colors
              respectReducedMotion: true,
              components: {
                Radio: {
                  defaultProps: MantineCompDefaultProps.Radio,
                },
                Checkbox: {
                  defaultProps: MantineCompDefaultProps.Checkbox,
                },
                Input: {
                  defaultProps: MantineCompDefaultProps.Input,
                },
                NumberInput: {
                  defaultProps: MantineCompDefaultProps.NumberInput,
                },
                Textarea: {
                  defaultProps: MantineCompDefaultProps.Textarea,
                },
                TextInput: {
                  defaultProps: MantineCompDefaultProps.TextInput,
                },
                Select: {
                  defaultProps: MantineCompDefaultProps.Select,
                },
                DatePicker: {
                  defaultProps: MantineCompDefaultProps.DatePicker,
                },
                Button: {
                  defaultProps: MantineCompDefaultProps.Button,
                },
              },
              // no sizing variant currently
              // all inputs should be xl sized with 0.875rem (14px) font size
              // remove this in the future if there input design systems are created
              globalStyles: () => ({
                ".mantine-Input-input": {
                  fontSize: `${MANTINE_INPUT_STYLES.primary.styles.input.fontSize} !important`,
                },
                ".mantine-InputWrapper-error": {
                  fontSize: `${MANTINE_INPUT_STYLES.primary.styles.error.fontSize} !important`,
                },
                ".mantine-Select-item": {
                  fontSize: `${MANTINE_SELECT_STYLES.primary.styles.item.fontSize} !important`,
                },
                ".mantine-InputWrapper-label": {
                  fontSize: `${MANTINE_INPUT_STYLES.primary.styles.label.fontSize} !important`,
                },
                ".mantine-Switch-label": {
                  fontSize: `${MANTINE_SWITCH_STYLES.primary.styles.label.fontSize} !important`,
                },
              }),
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
