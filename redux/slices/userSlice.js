import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setFreelancerID: (state, action) => {
      if(state.userDetails){
        state.userDetails = {...state.userDetails, freelancerId: action.payload};
      }
    },
    removeUserDetails: (state) => {
      state.userDetails = null;
    },
  },
});

export const { setUserDetails, removeUserDetails, setFreelancerID } = userSlice.actions;

export default userSlice.reducer;
