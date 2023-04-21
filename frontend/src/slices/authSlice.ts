import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  _id: string | null;
  token: string | null;
}

const initialState: AuthState = {
  _id: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ _id: string; token: string }>) => {
      state._id = action.payload._id;
      state.token = action.payload.token;
    },
    defaultState: (state) => {
      state = initialState;
    },
  },
});

export const { setUser, defaultState } = authSlice.actions;

export default authSlice.reducer;
