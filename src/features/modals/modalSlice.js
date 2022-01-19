import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleLoginModal: (state) => {
      state.showModal = !state.showModal;
    },
  },
});

export default modalSlice.reducer;

export const { toggleLoginModal } = modalSlice.actions;
