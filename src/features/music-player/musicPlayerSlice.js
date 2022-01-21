import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
    addOneSong: (state, { payload }) => {
      const songNotExist = state.songs.every(
        (oldSong) => oldSong._id !== payload._id
      );

      if (songNotExist || state.songs.length === 0) {
        toast.success("Song added!");
        state.songs.push(payload);
        return;
      }

      toast.error("Song already added");
    },
    removeOneSong: (state, { payload }) => {
      state.songs = state.songs.filter((song) => song._id !== payload.songId);
    },
    addPlaylistSong: (state, { payload }) => {
      const songListId = new Set(state.songs.map((song) => song._id));
      const mergedSongs = state.songs.concat(
        payload.filter((song) => !songListId.has(song._id))
      );

      state.songs = mergedSongs;
      toast.success("Playlist successfully added");
    },
    clearSongs: (state) => {
      state.songs = [];
    },
  },
});

export const {
  setIsPlaying,
  changeActiveSong,
  addNewSongs,
  addOneSong,
  addPlaylistSong,
  clearSongs,
  removeOneSong,
} = musicPlayerSlice.actions;

export const selectIsPlaying = (state) => state.musicPlayer.isPlaying;
export const selectActiveSong = (state) => state.musicPlayer.activeSong;
export const selectSongs = (state) => state.musicPlayer.songs;

export default musicPlayerSlice.reducer;
