import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ApiSlice } from "../Apis/ApiSlice";

// Load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    const persistedState = JSON.parse(serializedState);
    return {
      // Add other reducers you want to persist here
    };
  } catch (err) {
    return undefined;
  }
};

// Save state to local storage
const saveState = (state) => {
  try {
    const stateToPersist = {
      // Add other reducers you want to persist here
    };
    const serializedState = JSON.stringify(stateToPersist);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    // Handle errors here
  }
};

export const store = configureStore({
  reducer: {
    [ApiSlice.reducerPath]: ApiSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiSlice.middleware),
  preloadedState: loadState(),
});

// Save state to local storage whenever the state changes
store.subscribe(() => {
  saveState(store.getState());
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
