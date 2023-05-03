import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IData } from "../utils/type";
import userService from "../services/userService";

interface userState {
  user: IData | null;
  error: boolean | null | string | unknown;
  success: boolean;
  loading: boolean;
  message: string | null;
}

const initialState: userState = {
  user: null,
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const profile = createAsyncThunk(
  "user/profile",
  async (user, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.auth.user.token;
    const data = await userService.profile(user as unknown as IData, token);

    return data;
  }
);

export const updateProfile = createAsyncThunk(
  "user/update",
  async (user: IData, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.auth.user.token;

    const data = await userService.updateProfile(user, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (id: string, thunkAPI) => {
    const data = await userService.getUserDetails(id);

    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(profile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = payload;
        state.message = "Usuário atualizado com sucesso!";
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.user = null;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.error = payload.errors ? payload : null;
        state.user = payload;
      });
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
