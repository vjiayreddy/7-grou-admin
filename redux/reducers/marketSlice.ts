"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openForm: false,
  isDeleteInfoAlert: false,
  formData: null,
};

export const marketSlice: any = createSlice({
  name: "analysisSlice",
  initialState,
  reducers: {
    openMarketForm: (state, action) => {
      state.openForm = action.payload;
    },
    marketFormState: (state, action) => {
      state.formData = action.payload;
    },
    isDeleteInfoAlertState: (state, action) => {
      state.isDeleteInfoAlert = action.payload;
    },
  },
});

export const { marketFormState, openMarketForm,isDeleteInfoAlertState } = marketSlice.actions;
export default marketSlice.reducer;
