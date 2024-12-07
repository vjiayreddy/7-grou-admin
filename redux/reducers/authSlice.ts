"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenAuthModel: false,
};

export const authSlice: any = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    showAuthModel: (state, action) => {
      state.isOpenAuthModel = action.payload;
    },
  },
});

export const { showAuthModel } = authSlice.actions;
export default authSlice.reducer;
