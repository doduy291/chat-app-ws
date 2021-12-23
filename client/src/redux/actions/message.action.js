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

export const postSendMessage = createAsyncThunk(
  'message/postSendMessage',
  async ({ channelId, textMsg, typeMsg, ws }, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post(`${baseURL}/${channelId}/send-message`, { textMsg, typeMsg });
      ws.current.send(JSON.stringify({ message: data.message }));
      return data;
    } catch (error) {
      rejectWithValue(error.response?.data);
    }
  }
);
