"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { marketApi } from "../apis/marketApi";
import { marketSlice } from "../reducers/marketSlice";
import { mainGameRateApi } from "../apis/mainGameRateApi";
import { authSlice } from "../reducers/authSlice";
const rootReducer = combineReducers({
  [marketApi.reducerPath]: marketApi.reducer,
  [mainGameRateApi.reducerPath]: mainGameRateApi.reducer,
  marketSlice: marketSlice.reducer,
  authSlice: authSlice.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      marketApi.middleware,
      mainGameRateApi.middleware,
    ]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
