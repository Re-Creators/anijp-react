import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  songs: [],
  activeSong: null,
  songIndex: 0,
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
    addNewSongs: (state, { payload }) => {
      state.songs = payload.songs;
      state.activeSong = payload.songs[payload.indexSong];
    },
  },
});

export const { setIsPlaying, changeActiveSong, addNewSongs } =
  musicPlayerSlice.actions;

export const selectIsPlaying = (state) => state.musicPlayer.isPlaying;
export const selectActiveSong = (state) => state.musicPlayer.activeSong;
export const selectSongs = (state) => state.musicPlayer.songs;

export default musicPlayerSlice.reducer;
