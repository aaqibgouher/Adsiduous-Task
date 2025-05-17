import { createSlice } from "@reduxjs/toolkit";
import { getParsedUserData } from "../../utils/common";

const initialState = {
  me: getParsedUserData() || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateMe: (state, action) => {
      state.me = action.payload;
    },
  },
});

// Action
export const { updateMe } = authSlice.actions;

// Getters
export const getMeAuthState = (state) => state.auth.me;

export default authSlice.reducer;
