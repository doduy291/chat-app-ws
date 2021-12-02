import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../configs/axios.config';

const baseURL = '/api/channel';

export const getListChannels = createAsyncThunk('channel/getListChannels', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosClient.get(`${baseURL}/list-channels`);
    return data;
  } catch (error) {
    rejectWithValue(error.response?.data);
  }
});
