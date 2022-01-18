import { configureStore } from "@reduxjs/toolkit";
import musicPlayerReducer from "../features/music-player/musicPlayerSlice";
import userReducer from "../features/user/userSlice";
import modalReducer from "../features/modals/modalSlice";

export default configureStore({
  reducer: {
    musicPlayer: musicPlayerReducer,
    user: userReducer,
    modal: modalReducer,
  },
});
