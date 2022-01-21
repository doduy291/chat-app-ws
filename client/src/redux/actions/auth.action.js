import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../configs/axios.config';

const baseURL = '/api/auth';

export const postLogin = createAsyncThunk('auth/postLogin', async ({ dataHookForm }, { rejectWithValue }) => {
  try {
    const { data } = await axiosClient.post(`${baseURL}/login`, {
      email: dataHookForm.email,
      password: dataHookForm.password,
    });
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});
export const postSignup = createAsyncThunk('auth/postSignup', async ({ dataHookForm }, { rejectWithValue }) => {
  try {
    const { data } = await axiosClient.post(`${baseURL}/signup`, {
      email: dataHookForm.email,
      username: dataHookForm.username,
      password: dataHookForm.password,
    });
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});
