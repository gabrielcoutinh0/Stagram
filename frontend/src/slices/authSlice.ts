import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../services/authService";
import { IData } from "../utils/type";

const user = JSON.parse(localStorage.getItem("user") as string);

interface authState {
  user: IData | null;
  error: boolean | null | string | unknown;
  success: boolean;
  loading: boolean;
}

const initialState: authState = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
};

export const register = createAsyncThunk(
  "auth/register",
  async (user: IData, thunkAPI) => {
    const data = await authService.register(user);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const login = createAsyncThunk(
  "auth/login",
  async (user: IData, thunkAPI) => {
    const data = await authService.login(user);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = false;
      state.success = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = payload;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = payload;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
