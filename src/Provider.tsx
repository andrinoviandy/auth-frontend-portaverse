import NiceModal from "@ebay/nice-modal-react";
import { MantineProvider } from "@mantine/core";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// import useIsAuthenticated from '@hooks/useIsAuthenticated';
import MobileBanner from "./Components/Misc/MobileBanner";
import {
  persistedStore,
  store,
  unpersistedStore,
} from "./Configs/Redux/store";
import { unpersistedStoreContext } from "./Contexts/ReduxContext";
import theme from "./theme";

/**
 * Responsible for providing the context of the application.
 */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function Providers({ children }: { children: React.ReactNode }) {
  // const isAuthenticated = useIsAuthenticated();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     window.location.href = `${import.meta.env.VITE_SSO_URL}/login`;
  //   }
  // }, [isAuthenticated]);

  return (
    <Provider store={store}>
      <Provider
        store={unpersistedStore}
        context={unpersistedStoreContext}
      >
        <PersistGate loading={null} persistor={persistedStore}>
          <QueryClientProvider client={queryClient}>
            <MantineProvider theme={theme}>
              <NiceModal.Provider>
                <MobileBanner />
                {children}
              </NiceModal.Provider>
            </MantineProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </Provider>
  );
}

export default Providers;
