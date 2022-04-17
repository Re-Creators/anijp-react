import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage, authApp, auth } from "../../firebase-config";
import { v4 as uuidv4 } from "uuid";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { getUserPlaylist } from "../user-playlist/userPlaylistSlice";

const initialState = {
  loggedIn: false,
  user: null,
  likedPlaylist: [],
  likedSongs: [],
  isLoading: false,
  error: null,
};

export const getUserData = createAsyncThunk(
  "user/fetch",
  async (userId, { dispatch }) => {
    try {
      const userRef = doc(db, "users", userId);
      const result = await getRedirectResult(auth);

      if (result) {
        const newUser = result.user;
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          return docSnap.data();
        }

        await setDoc(userRef, {
          username: newUser.displayName,
          email: newUser.email,
          photo: newUser.photoURL,
          likedPlaylist: [],
          likedSong: [],
        });
      }

      const userSnap = await getDoc(userRef);

      dispatch(getUserPlaylist(userId));

      return { ...userSnap.data(), uid: userId };
    } catch (err) {
      return err;
    }
  }
);

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

export const login = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      await signInWithEmailAndPassword(
        authApp,
        userData.email,
        userData.password
      );
      return null;
    } catch (err) {
      return rejectWithValue(err.code);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (device) => {
    const provider = new GoogleAuthProvider();
    let response = null;
    try {
      if (device === "DESKTOP") {
        response = await signInWithPopup(auth, provider);
      } else if (device === "MOBILE") {
        response = await signInWithRedirect(auth, provider);
      }

      const user = response.user;
      const newUserRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(newUserRef);

      if (docSnap.exists()) {
        console.log("user " + docSnap.data());
        return docSnap.data();
      }

      const newUser = await setDoc(newUserRef, {
        username: user.displayName,
        email: user.email,
        photo: user.photoURL,
        likedPlaylist: [],
        likedSong: [],
      });
      console.log("new user " + newUser);
      return newUser;
    } catch (err) {
      return err;
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const user = response.user;
      const newUserRef = doc(db, "users", user.uid);
      await setDoc(newUserRef, {
        username: userData.username,
        email: userData.email,
        photo:
          "https://firebasestorage.googleapis.com/v0/b/ani-jp.appspot.com/o/userPhoto%2Fdefault-user-imge.jpeg?alt=media&token=b0623059-35ce-4efc-963d-8184d842f27d",
        likedPlaylist: [],
        likedSong: [],
      });

      return null;
    } catch (err) {
      return rejectWithValue(err.code);
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
    clearError: (state) => {
      state.error = null;
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
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, _) => {
      state.isLoading = false;
    },
    [login.rejected]: (state) => {
      state.isLoading = false;
    },
    [register.pending]: (state) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [register.rejected]: (state, { payload }) => {
      if (payload === "auth/email-already-in-use") {
        state.error = "Email already used.";
      }
      state.isLoading = false;
    },
  },
});

export const {
  setLoggedIn,
  updateLikedSongs,
  updateLikedPlaylist,
  clearError,
} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectisLoading = (state) => state.user.isLoading;
export const selectLikedSongs = (state) => state.user.likedSongs;
export const selectLikedPlaylist = (state) => state.user.likedPlaylist;
export const selectError = (state) => state.user.error;
export const selectIsLoggedIn = (state) => state.user.loggedIn;

export default userSlice.reducer;
