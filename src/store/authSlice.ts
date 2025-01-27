import { createSlice } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
}

const storedUser = localStorage.getItem('user-info');
const parsedUser: User | null = storedUser ? JSON.parse(storedUser) : null;

const initialState: AuthState = {
  user: parsedUser,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;

export default authSlice.reducer;
