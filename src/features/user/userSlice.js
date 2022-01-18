import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

const initialState = {
  loggedIn: false,
  user: null,
  isFetching: false,
};

export const getUserData = createAsyncThunk("user/fetch", async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    return userSnap.data();
  } catch (err) {
    return err;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedIn: (state, { payload }) => {
      state.loggedIn = payload;
    },
  },
  extraReducers: {
    [getUserData.pending]: (state) => {
      state.isFetching = true;
    },
    [getUserData.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.isFetching = false;
    },
    [getUserData.rejected]: (state) => {
      state.isFetching = false;
    },
  },
});

export const { setLoggedIn } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectIsFetching = (state) => state.user.isFetching;
export default userSlice.reducer;
