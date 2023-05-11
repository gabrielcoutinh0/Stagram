import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { photoService } from "../services/photoService";
import { IComment, IPhoto } from "../utils/type";
import { pull } from "../utils/pull";

interface photoState {
  photos: [];
  photo: IPhoto | null;
  error: boolean | null | string | unknown;
  success: boolean;
  loading: boolean;
  message: string | null;
}

const initialState: photoState = {
  photos: [],
  photo: null,
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

export const getUserPhotos = createAsyncThunk(
  "photo/userPhotos",
  async (id: string, thunkAPI) => {
    const data = await photoService.getUserPhotos(id);

    return data;
  }
);

export const getAllPhotos = createAsyncThunk(
  "photo/allPhotos",
  async (_, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.auth.user.token;

    const data = await photoService.getAllPhotos(token);

    if (data.errors) return thunkAPI.rejectWithValue(data.error[0]);

    return data;
  }
);

export const getPhotoById = createAsyncThunk(
  "photo/photoById",
  async (id: string, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.auth.user.token;

    const data = await photoService.getPhotoById(id, token);

    if (data.errors) return thunkAPI.rejectWithValue(data.error[0]);

    return data;
  }
);

export const deletePhoto = createAsyncThunk(
  "photo/deletePhoto",
  async (id: string, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.auth.user.token;

    const data = await photoService.deletePhoto(id, token);

    if (data.errors) return thunkAPI.rejectWithValue(data.error[0]);

    return data;
  }
);

export const likePhoto = createAsyncThunk(
  "photo/likePhoto",
  async (id: string, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.auth.user.token;

    const data = await photoService.likePhoto(id, token);

    if (data.errors) return thunkAPI.rejectWithValue(data.error[0]);

    return data;
  }
);

export const commentPhoto = createAsyncThunk(
  "photo/commentPhoto",
  async (commentData: IComment, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.auth.user.token;

    const data = await photoService.commentPhoto(
      { comment: commentData.comment },
      commentData._id as string,
      token
    );

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
        state.photo = null;
      })
      .addCase(getUserPhotos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserPhotos.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = payload;
      })
      .addCase(getAllPhotos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllPhotos.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = payload;
      })
      .addCase(getPhotoById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getPhotoById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo = payload ? payload : null;
      })
      .addCase(getPhotoById.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.photo = null;
      })
      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deletePhoto.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = payload.message;
      })
      .addCase(deletePhoto.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.photo = null;
      })
      .addCase(likePhoto.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        if (state?.photo?.likes) {
          state.photo.likes.includes(payload.userId)
            ? pull(state.photo.likes, payload.userId)
            : state.photo.likes.push(payload?.userId);
        }

        state.photos.map((photo: IPhoto) => {
          if (photo._id === payload.photoId) {
            return photo.likes?.push(payload.userId);
          }
          return photo;
        });
        state.message = payload.message;
      })
      .addCase(likePhoto.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(commentPhoto.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo?.comments?.push(payload.comment);
        state.message = payload.message;
      })
      .addCase(commentPhoto.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
