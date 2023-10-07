import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth-slice';

const reducer = {
  profile: authSlice.reducer,
};

export const store = configureStore({
  reducer,
});
