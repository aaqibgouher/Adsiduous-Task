// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import fileReducer from "./slice/fileSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    myDrive: fileReducer,
  },
});

export default store;
