import { createContext } from "react";
import { createDispatchHook, createSelectorHook } from "react-redux";

export const unpersistedStoreContext = createContext();
export const useUnpersistedSelector = createSelectorHook(
  unpersistedStoreContext,
);
export const useUnpersistedDispatch = createDispatchHook(
  unpersistedStoreContext,
);
