import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import videosReducer from "../features/videos/videosSlice"
import assignmentReducer from "../features/assignment/assignmentSlice"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    videos: videosReducer,
    assignment: assignmentReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
