import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient, formDataConfig } from '../../configs/axios.config';

const baseURL = '/api/message';

export const postSendMessage = createAsyncThunk(
  'message/postSendMessage',
  async ({ channelId, formData, ws }, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post(`${baseURL}/${channelId}/send-message`, formData, formDataConfig);
      ws.current.send(JSON.stringify({ msg: data.message, type: 'res-send-message' }));
      return data;
    } catch (error) {
      rejectWithValue(error.response?.data);
    }
  }
);
