import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../configs/axios.config';

const baseURL = '/api/message';

export const getMessageChannel = createAsyncThunk(
  'message/getMessageChannel',
  async ({ channelId, skipMsg = 0 }, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get(`${baseURL}/${channelId}?skipMsg=${skipMsg}`);
      return data;
    } catch (error) {
      rejectWithValue(error.response?.data);
    }
  }
);
