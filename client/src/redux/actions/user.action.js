import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../configs/axios.config';

const baseURL = '/api/user';

export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
  const { data } = await axiosClient.get(`${baseURL}/user-info`);
  console.log(data);
  return data;
});
