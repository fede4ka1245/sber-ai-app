import { configureStore } from '@reduxjs/toolkit'
import imageProcessingReducer from "./slices/imageProcessingSlice";
import mainReducer from "./slices/mainSlice";
import imageSaverReducer from "./slices/imageSaverSlice";

export default configureStore({
  reducer: {
    imageProcessor: imageProcessingReducer,
    main: mainReducer,
    imageSaver: imageSaverReducer
  },
});
