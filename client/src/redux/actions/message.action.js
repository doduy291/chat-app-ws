import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../configs/axios.config';

const baseURL = '/api/message';

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
