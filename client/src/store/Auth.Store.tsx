import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Auth.slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const AuthStore = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default AuthStore;

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof AuthStore.getState>;
export type AppDispatch = typeof AuthStore.dispatch;

// Export hooks for usage in components
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
