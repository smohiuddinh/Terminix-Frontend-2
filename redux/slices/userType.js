import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const userTypeSlice = createSlice({
  name: "userType",
  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.user = {...state.user, ...action.payload};
    },
     resetUserType: (state) => {
      state.user = {};
    },
  },
});

export const { setUserType, resetUserType } = userTypeSlice.actions;

export default userTypeSlice.reducer;
