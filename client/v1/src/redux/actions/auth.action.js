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

export const getLogout = createAsyncThunk('auth/getLogout', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosClient.get(`${baseURL}/logout`);
    if (res.status === 200) {
      window.location.href = '/login';
    }
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});
