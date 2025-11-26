import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfile: {},
};

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    getUserProfile : (state, action) => {
        state.userProfile = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = {...state.userProfile, ...action.payload};
    },
    resetUserProfile: (state) => { 
        state.userProfile = {}
    }
  },
});

export const { setUserProfile, resetUserProfile, getUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
