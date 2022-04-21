import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "store",
  initialState: {
    myKmaps: true,
    isTableList: false,
    myRepo: true,
  },

  reducers: {
    setMyKmaps: (state, action) => {
      state.myKmaps = action.payload;
    },
    setIsTableList: (state, action) => {
      state.isTableList = action.payload;
    },
    setMyRepo: (state, action) => {
      state.myRepo = action.payload;
    },
  },
});

export const { setMyKmaps, setIsTableList, setMyRepo } =
  slice.actions;
export default slice.reducer;
