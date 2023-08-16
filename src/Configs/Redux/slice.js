import { createSlice } from "@reduxjs/toolkit";

// TODO Reset Redux on Logout
/* eslint-disable no-param-reassign */
export const slice = createSlice({
  name: "store",
  initialState: {
    unreadNotifications: {
      all: 0,
      kms: 0,
      lms: 0,
      tms: 0,
    },
  },

  reducers: {
    setUnreadNotification: (state, action) => {
      const { all, kms, lms, tms } = action.payload;
      state.unreadNotifications = {
        all: all || all === 0 ? all : state.unreadNotifications.all,
        kms: kms || kms === 0 ? kms : state.unreadNotifications.kms,
        lms: lms || lms === 0 ? lms : state.unreadNotifications.lms,
        tms: tms || tms === 0 ? tms : state.unreadNotifications.tms,
      };
    },
  },
});

export const { setUnreadNotification } = slice.actions;

export default slice.reducer;
