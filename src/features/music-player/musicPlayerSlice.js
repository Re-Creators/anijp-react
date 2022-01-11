import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  songs: [],
  activeSong: null,
};

const musicPlayerSlice = createSlice({
  name: "musicPlayer",
  initialState,
  reducers: {
    setIsPlaying: (state, { payload }) => {
      state.isPlaying = payload;
    },
    changeActiveSong: (state, { payload }) => {
      state.activeSong = payload;
    },
  },
});

export const { setIsPlaying, changeActiveSong } = musicPlayerSlice.actions;

export const selectIsPlaying = (state) => state.musicPlayer.isPlaying;
export const selectActiveSong = (state) => state.musicPlayer.activeSong;

export default musicPlayerSlice.reducer;
