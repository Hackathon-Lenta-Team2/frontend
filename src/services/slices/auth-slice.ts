import { createSlice } from '@reduxjs/toolkit';
import { fetchLogin, fetchLogout } from '../async-thunk/auth-thunk';
import { deleteCookie, setCookie } from '../../utils/helpers';

interface IAuthSliceState {
  loginError: null | boolean;
  loginLoading: null | boolean;
  logoutError: null | boolean;
  logoutLoading: null | boolean;
  authToken: string;
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    loginError: null,
    loginLoading: null,
    logoutError: null,
    logoutLoading: null,
    authToken: '',
  } as IAuthSliceState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loginLoading = true;
        state.loginError = false;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loginError = false;
        state.loginLoading = false;
        state.authToken = action.payload.auth_token;
        if (action.payload.isUserSaved) {
          setCookie('token', action.payload.auth_token, { path: '/' });
        } else {
          window.sessionStorage.setItem('token', action.payload.auth_token);
        }
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.loginLoading = false;
        state.loginError = true;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.logoutLoading = true;
        state.logoutError = false;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.logoutError = false;
        state.logoutLoading = false;
        deleteCookie('token');
        window.sessionStorage.removeItem('token');
      })
      .addCase(fetchLogout.rejected.type, (state) => {
        state.logoutLoading = false;
        state.logoutError = true;
      });
  },
});
