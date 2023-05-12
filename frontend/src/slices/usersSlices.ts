import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IData } from "../utils/type";
import usersService from "../services/usersService";

interface userState {
  users: [IData] | null;
  error: boolean | null | string | unknown;
  success: boolean;
  loading: boolean;
  message: string | null;
}

const initialState: userState = {
  users: null,
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkAPI) => {
    const data = await usersService.getAllUsers();

    if (data.errors) return thunkAPI.rejectWithValue(data.error[0]);

    return data;
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.users = payload;
      });
  },
});

export const { resetMessage } = usersSlice.actions;
export default usersSlice.reducer;
