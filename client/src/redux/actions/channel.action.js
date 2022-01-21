import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../configs/axios.config';

const baseURL = '/api/channel';

export const postCreateChannel = createAsyncThunk(
  'channel/postCreateChannel',
  async ({ dataHookForm, channelType = '', selectedUsers = [] }, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post(`${baseURL}/create-channel`, {
        channelName: dataHookForm.channelName,
        channelType,
        members: selectedUsers,
      });
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
