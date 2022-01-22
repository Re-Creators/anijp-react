import { configureStore } from "@reduxjs/toolkit";
import musicPlayerReducer from "../features/music-player/musicPlayerSlice";
import userReducer from "../features/user/userSlice";
import modalReducer from "../features/modals/modalSlice";
import userPlaylistReducer from "../features/user-playlist/userPlaylistSlice";

export default configureStore({
  reducer: {
    musicPlayer: musicPlayerReducer,
    user: userReducer,
    modal: modalReducer,
    userPlaylist: userPlaylistReducer,
  },
});
