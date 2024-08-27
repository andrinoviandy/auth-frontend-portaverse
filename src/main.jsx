import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React from "react";
import ReactDOM from "react-dom/client";
import "dayjs/locale/id";

import "./index.css";

import App from "./App";
import Providers from "./Provider";

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.locale("id");

ReactDOM.createRoot(document.getElementById("root")).render(
  // ! Warning
  // * Temporarily disable React.StrictMode on Development
  // * cause some component has issue (E.g.: react-beautiful-dnd, etc.)
  // * you can enable it when not working with troubled component
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
);
