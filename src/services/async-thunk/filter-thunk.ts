import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseAuth } from '../../utils/constants';
import { checkAnswer, getCookie } from '../../utils/helpers';

const token = getCookie('token') || window.sessionStorage.getItem('token');
export const getStores = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${baseAuth}/stores`,
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

export const fetchGetStores = createAsyncThunk(
  'filters/fetchGetStores',
  async (_, thunkApi) => {
    try {
      const res = await getStores();
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.message);
      }
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getGroups = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${baseAuth}/groups`,
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

export const fetchGetGroups = createAsyncThunk(
  'filters/fetchGetGroups',
  async (_, thunkApi) => {
    try {
      const res = await getGroups();
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.message);
      }
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getCategories = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${baseAuth}/categories`,
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

export const fetchGetCategories = createAsyncThunk(
  'filters/fetchGetCategories',
  async (_, thunkApi) => {
    try {
      const res = await getCategories();
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.message);
      }
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getSubcategories = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${baseAuth}/subcategories`,
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

export const fetchGetSubcategories = createAsyncThunk(
  'filters/fetchGetSubcategories',
  async (_, thunkApi) => {
    try {
      const res = await getSubcategories();
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.message);
      }
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getProducts = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${baseAuth}/products`,
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

export const fetchGetProducts = createAsyncThunk(
  'filters/fetchGetProducts',
  async (_, thunkApi) => {
    try {
      const res = await getProducts();
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.message);
      }
      return thunkApi.rejectWithValue(err);
    }
  }
);
