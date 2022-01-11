import { configureStore } from "@reduxjs/toolkit";
import musicPlayerReducer from "../features/music-player/musicPlayerSlice";

export default configureStore({
  reducer: {
    musicPlayer: musicPlayerReducer,
  },
});
