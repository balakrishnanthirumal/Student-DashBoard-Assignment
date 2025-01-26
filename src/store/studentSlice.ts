import { createSlice } from '@reduxjs/toolkit';

const addStudentSlice = createSlice({
  name: 'student',
  initialState: {
    students: [],
  },
  reducers: {
    createStudent: (state, action) => {
      state.students = action.payload;
    },
  },
});

export const { createStudent } = addStudentSlice.actions;

export default addStudentSlice.reducer;
