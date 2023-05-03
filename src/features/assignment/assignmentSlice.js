import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const videosSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {
    }
});

export const { loadAssignment } = videosSlice.actions;
export default videosSlice.reducer;
