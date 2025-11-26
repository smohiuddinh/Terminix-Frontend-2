import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gigsDetails: {},
};

export const gigsDetailSlice = createSlice({
  name: "gigs",
  initialState,
  reducers: {
    setGigsDetails: (state, action) => {
      state.gigsDetails = {...state.gigsDetails, ...action.payload};
    },
    resetGigDetails: (state) => { 
        state.gigsDetails = {}
    }
  },
});

export const { setGigsDetails, resetGigDetails } = gigsDetailSlice.actions;

export default gigsDetailSlice.reducer;
