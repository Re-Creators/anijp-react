import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
};

const helmetTitleSlice = createSlice({
  name: "helmetTitle",
  initialState,
  reducers: {
    setHelmetTitle: (state, { payload }) => {
      state.title = payload;
    },
  },
});

export const { setHelmetTitle } = helmetTitleSlice.actions;
export const selectHelmetTitle = (state) => state.helmetTitle.title;
export default helmetTitleSlice.reducer;
