import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../configs/axios.config';

const baseURL = '/api/auth';

export const postLogin = createAsyncThunk('auth/postLogin', async ({ email, password }, { rejectWithValue }) => {
  try {
    const { data } = await axiosClient.post(`${baseURL}/login`, { email, password });
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});
export const postSignup = createAsyncThunk(
  'auth/postSignup',
  async ({ email, username, password }, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post(`${baseURL}/signup`, { email, username, password });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
