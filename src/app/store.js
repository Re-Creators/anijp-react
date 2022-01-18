import { configureStore } from "@reduxjs/toolkit";
import musicPlayerReducer from "../features/music-player/musicPlayerSlice";
import userReducer from "../features/user/userSlice";

export default configureStore({
  reducer: {
    musicPlayer: musicPlayerReducer,
    user: userReducer,
  },
});
