import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { photoService } from "../services/photoService";
import { IPhoto } from "../utils/type";

interface photoState {
  photos: [];
  photo: {};
  error: boolean | null | string | unknown;
  success: boolean;
  loading: boolean;
  message: string | null;
}

const initialState: photoState = {
  photos: [],
  photo: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const publishPhoto = createAsyncThunk(
  "photo/publish",
  async (photo: IPhoto, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.auth.user.token;

    const data = await photoService.publishPhoto(photo, token);

    if (data.errors) return thunkAPI.rejectWithValue(data.error[0]);

    return data;
  }
);

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(publishPhoto.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo = payload;
        state.photos.unshift(state.photo as never);
        state.message = "Foto publicada com sucesso!";
      })
      .addCase(publishPhoto.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.photo = {};
      });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
