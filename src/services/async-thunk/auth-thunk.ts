import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {authUrl} from '../../utils/constants';
import {checkAnswer, getCookie} from '../../utils/helpers';

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${authUrl}login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ email, password }),
    });
    return checkAnswer(res);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return Promise.reject(err.message);
    }
    return Promise.reject(err);
  }
};

export const fetchLogin = createAsyncThunk(
  'profile/fetchLogin',
  async (
    {
      email,
      password,
      isUserSaved,
    }: {
      email: string;
      password: string;
      isUserSaved: boolean;
    },
    thunkApi
  ) => {
    try {
      const res = await loginUser({ email, password });
      const data = res.data;
      data.isUserSaved = isUserSaved;
      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.message);
      }
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const logoutUser = async () => {
  const token = getCookie('token') || window.sessionStorage.getItem('token');
  try {
    const res = await axios({
      method: 'POST',
      url: `${authUrl}logout`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    return checkAnswer(res);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return Promise.reject(err.message);
    }
    return Promise.reject(err);
  }
};

export const fetchLogout = createAsyncThunk(
  'profile/fetchLogout',
  async (_, thunkApi) => {
    try {
      const res = await logoutUser();
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.message);
      }
      return thunkApi.rejectWithValue(err);
    }
  }
);
