import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  from: null,
  to: null,
};

const airportsSlice = createSlice({
  name: "airports",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOut: (state) => {
      state.error = null;
      state.loading = null;
      state.currentUser = null;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, signOut } =
  userSlice.actions;
export default userSlice.reducer;
