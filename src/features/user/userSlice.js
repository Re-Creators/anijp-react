import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase-config";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  loggedIn: false,
  user: null,
  likedPlaylist: [],
  likedSongs: [],
  isLoading: false,
};

export const getUserData = createAsyncThunk("user/fetch", async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    return { ...userSnap.data(), uid: userId };
  } catch (err) {
    return err;
  }
});

export const updateUserData = createAsyncThunk(
  "user/update",
  async ({ newData, onSuccess }, { getState }) => {
    const user = getState().user.user;

    const docRef = ref(storage, "userPhoto/" + uuidv4());
    const userRef = doc(db, "users", user.uid);

    let photoURL = user.photo;

    try {
      if (newData.newPhoto) {
        await uploadBytes(docRef, newData.newPhoto);
        photoURL = await getDownloadURL(docRef);
      }

      await updateDoc(
        userRef,
        { username: newData.username, photo: photoURL },
        { merge: true }
      );

      onSuccess();
      return { username: newData.username, photo: photoURL };
    } catch (err) {
      return err;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedIn: (state, { payload }) => {
      state.loggedIn = payload;
    },
    updateLikedSongs: (state, { payload }) => {
      state.likedSongs = payload;
    },
    updateLikedPlaylist: (state, { payload }) => {
      state.likedPlaylist = payload;
    },
  },
  extraReducers: {
    [getUserData.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserData.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.likedSongs = payload.likedSong;
      state.likedPlaylist = payload.likedPlaylist;
      state.isLoading = false;
    },
    [getUserData.rejected]: (state) => {
      state.isLoading = false;
    },
    [updateUserData.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUserData.fulfilled]: (state, { payload }) => {
      state.user = {
        ...state.user,
        username: payload.username,
        photo: payload.photo,
      };
      state.isLoading = false;
    },
    [updateUserData.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setLoggedIn, updateLikedSongs, updateLikedPlaylist } =
  userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectisLoading = (state) => state.user.isLoading;
export const selectLikedSongs = (state) => state.user.likedSongs;
export const selectLikedPlaylist = (state) => state.user.likedPlaylist;

export default userSlice.reducer;
