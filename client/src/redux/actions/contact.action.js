import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../configs/axios.config';

const baseURL = '/api/contact';

export const postSendRequest = createAsyncThunk(
  'contact/postSendRequest',
  async ({ dataHookForm }, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post(`${baseURL}/send-request`, { contact: dataHookForm.contactName });
      console.log(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const postAcceptRequest = createAsyncThunk(
  'contact/postAcceptRequest',
  async ({ requesterId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post(`${baseURL}/accept-request`, { requesterId });
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deletePendingRequest = createAsyncThunk(
  'contact/deleteDeletePending',
  async ({ requesterId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.put(`${baseURL}/delete-pending-request`, { requesterId: requesterId });
      return data;
    } catch (error) {
      rejectWithValue(error.response?.data);
    }
  }
);
