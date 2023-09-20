import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ImageSaver} from "../../logic/imageSaver/imageSaver";
import {imageNames} from "../../consts/imagesNames";
import moment from "moment/moment";
import {
  requestManagePermission as pluginRequestManagePermission,
  checkManagePermission as pluginCheckManagePermission
} from "manage-external-storage";

const openFile = createAsyncThunk(
  'imageSaver/openFolder',
  async (path, thunkAPI) => {
    if (path) {
      return await ImageSaver.openImage(path);
    } else {
      const state = await thunkAPI.getState();
      return await ImageSaver.openImage(state.imageSaver.path);
    }
  }
);

const initManagePermission = createAsyncThunk(
  'imageSaver/initRequest',
  async () => {
    const isPermitted = await pluginCheckManagePermission();

    if (isPermitted) {
      return isPermitted;
    }

    return await pluginRequestManagePermission();
  }
);

const initialState = {
  path: ImageSaver.getDocumentDirectory(),
  isLoading: false,
  isManageExternalStoragePermitted: false,
  writeExternalStorageResponse: '',
  originalImageName: imageNames.originalImage + moment().unix() + '.png',
  processedImageName: imageNames.processedImage + moment().unix() + '.png'
};

export const imageSaverSlice = createSlice({
  name: 'imageSaver',
  initialState,
  reducers: {
    setPath: (state, action) => {
      state.path = action.payload;
    },
    toggleLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    setWriteExternalStorageResponse: (state, action, ) => {
      state.writeExternalStorageResponse = action.payload;
    },
    resetImageSaver: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(initManagePermission.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(initManagePermission.fulfilled, (state, action) => {
      state.isManageExternalStoragePermitted = action.payload;

      state.isLoading = false;
    });
    builder.addCase(initManagePermission.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

const {
  setPath,
  toggleLoading,
  resetImageSaver,
  setWriteExternalStorageResponse,
} = imageSaverSlice.actions;

export {
  openFile,
  setPath,
  initManagePermission,
  toggleLoading,
  resetImageSaver,
  setWriteExternalStorageResponse,
};
export default imageSaverSlice.reducer;