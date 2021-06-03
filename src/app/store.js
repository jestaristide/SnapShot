import { configureStore } from '@reduxjs/toolkit';
import photoReducer from '../features/slice/photoSlice';

export default configureStore({
  reducer: {
    photos: photoReducer,
  },
});