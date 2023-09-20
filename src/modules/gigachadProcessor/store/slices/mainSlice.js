import { createSlice } from '@reduxjs/toolkit'
import {tabs} from "../../consts/tabs";

const initialState = {
  tab: tabs.main
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    openGigachad: (state) => {
      state.tab = tabs.main;
    },
    openImageSaver: (state) => {
      state.tab = tabs.imageSaver;
    },
    openImagesSaved: (state) => {
      state.tab = tabs.imagesSaved;
    },
    resetMain: () => {
      return initialState;
    },
  },
})

export const { openGigachad, openImageSaver, resetMain, openImagesSaved } = mainSlice.actions

export default mainSlice.reducer