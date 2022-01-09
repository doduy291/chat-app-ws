import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient, formDataConfig } from '../../configs/axios.config';

const baseURL = '/api/message';

export const postSendMessage = createAsyncThunk(
  'message/postSendMessage',
  async ({ channelId, textMsg, typeMsg = 'text', ws, formData }, { rejectWithValue }) => {
    try {
      if (typeMsg === 'text') {
        const { data } = await axiosClient.post(`${baseURL}/${channelId}/send-message`, {
          textMsg: textMsg.trim(),
          typeMsg,
        });
        console.log(data);
        ws.current.send(JSON.stringify({ msg: data.message, type: 'res-send-message' }));
        return data;
      }
      if (typeMsg === 'image') {
        const { data } = await axiosClient.post(`${baseURL}/${channelId}/send-message`, formData, formDataConfig);
        console.log(data);
        ws.current.send(JSON.stringify({ msg: data.message, type: 'res-send-message' }));
        return data;
      }
    } catch (error) {
      rejectWithValue(error.response?.data);
    }
  }
);
