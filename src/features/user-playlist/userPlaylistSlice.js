import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";

const initialState = {
  isFetching: false,
  data: [],
};

export const getUserPlaylist = createAsyncThunk(
  "userPlaylist/fetch",
  async (userId) => {
    const playlistRef = collection(db, "user_playlists");
    const q = query(playlistRef, where("user_id", "==", userId));
    try {
      const { docs } = await getDocs(q);
      let playlist = [];

      docs.forEach((doc) => {
        const data = {
          id: doc.id,
          name: doc.data().name,
          user_id: doc.data().user_id,
          songs: doc.data().songs,
          cover: doc.data().cover,
          coverPathStorage: doc.data().coverPathStorage,
        };
        playlist.push(data);
      });

      return playlist;
    } catch (err) {
      console.log("err");
    }
  }
);

const userPlaylistSlice = createSlice({
  name: "userPlaylist",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserPlaylist.pending]: (state) => {
      state.isFetching = true;
    },
    [getUserPlaylist.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isFetching = false;
    },
    [getUserPlaylist.rejected]: (state) => {
      state.isFetching = false;
    },
  },
});

export const selectUserPlaylist = (state) => state.userPlaylist.data;
export default userPlaylistSlice.reducer;
