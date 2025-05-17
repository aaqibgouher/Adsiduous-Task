import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
};

const fileSlice = createSlice({
  name: "myDrive",
  initialState,
  reducers: {
    updateFiles: (state, action) => {
      state.files = action.payload;
    },
  },
});

// Action
export const { updateFiles } = fileSlice.actions;

// Getters
export const getFilesState = (state) => state.myDrive.files;

export default fileSlice.reducer;
