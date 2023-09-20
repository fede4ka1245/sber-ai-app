import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {processImage as gigachadProcessImage} from "../../logic/imageProcessing/processImage";
import {Platform} from "react-native";
import {ImageLoaderAndroid, ImageLoaderIos} from "../../logic/imageLoader/imageLoader";

const imageLoader = Platform === 'ios' ? new ImageLoaderIos() : new ImageLoaderAndroid();

const processImage = createAsyncThunk(
  'imageProcessing/processImage',
  async (webView, thunkAPI) => {
    const store = await thunkAPI.getState();

    return await gigachadProcessImage(store.imageProcessor.image, webView);
  }
);

const requestReadPermission = createAsyncThunk(
  'imageProcessing/requestReadPermission',
  async () => {
    return await imageLoader.requestPermissions();
  }
);

const loadImage = createAsyncThunk(
  'imageProcessing/loadImage',
  async (arg) => {
    return await imageLoader.getPhoto(arg)
  }
);

const initialImageLoading = createAsyncThunk(
  'imageProcessing/initialImageLoading',
  async () => {
    return await imageLoader.initialProcess();
  }
);

const initialState = {
  image: undefined,
  processedImage: undefined,
  isProcessing: false,
  permissionResponse: ''
}

export const imageProcessingSlice = createSlice({
  name: 'imageProcessing',
  initialState,
  reducers: {
    resetImageProcessing: () => {
      return initialState
    },
    toggleProcessing: (state) => {
      state.isProcessing = !state.isProcessing;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(processImage.pending, (state) => {
      state.isProcessing = true;
    })
    builder.addCase(processImage.fulfilled, (state, action) => {
      state.isProcessing = false;
      state.processedImage = action.payload;
    })
    builder.addCase(processImage.rejected, (state) => {
      state.isProcessing = false;
    })
    builder.addCase(requestReadPermission.fulfilled, (state, action) => {
      state.permissionResponse = action.payload;
    })
    builder.addCase(loadImage.fulfilled, (state, action) => {
      state.image = action.payload;
    })
    builder.addCase(initialImageLoading.fulfilled, (state, action) => {
      const {
        permission,
        image
      } = action.payload;

      state.image = image;
      state.permissionResponse = permission
    })
  },
})

const { resetImageProcessing, toggleProcessing } = imageProcessingSlice.actions;

export {
  resetImageProcessing,
  processImage,
  loadImage,
  toggleProcessing,
  requestReadPermission,
  initialImageLoading
};

export default imageProcessingSlice.reducer