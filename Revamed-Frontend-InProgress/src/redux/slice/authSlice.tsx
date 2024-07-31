import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token:
    typeof window !== "undefined"
      ? localStorage.getItem("token") || null
      : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuth: (state, action) => {
      state.token = action.payload;
    },
    deleteAuth: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { addAuth, deleteAuth } = authSlice.actions;

export default authSlice.reducer;
