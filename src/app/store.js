import { configureStore } from '@reduxjs/toolkit';
import mountainReducer from '../features/slice/mountainSlice';

export default configureStore({
  reducer: {
    mountain: mountainReducer,
  },
});