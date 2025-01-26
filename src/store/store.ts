import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import addStudentSlice from './studentSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    student: addStudentSlice,
  },
});

export default store;
