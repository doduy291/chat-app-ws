import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../configs/axios.config';

const baseURL = '/api/channel';

export const getListGroupChannels = createAsyncThunk('channel/getListGroupChannels', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosClient.get(`${baseURL}/list-group-channels`);
    return data;
  } catch (error) {
    rejectWithValue(error.response?.data);
  }
});

export const getListDMs = createAsyncThunk('channel/getListDMs', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosClient.get(`${baseURL}/list-DMs`);
    return data;
  } catch (error) {
    rejectWithValue(error.response?.data);
  }
});
