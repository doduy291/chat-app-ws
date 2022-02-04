import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../configs/axios.config';

const baseURL = '/api/contact';

export const postSendRequest = createAsyncThunk(
  'contact/postSendRequest',
  async ({ dataHookForm }, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post(`${baseURL}/send-request`, { contact: dataHookForm.contactName });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const postAcceptRequest = createAsyncThunk(
  'contact/postAcceptRequest',
  async ({ requesterId, useWS }, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post(`${baseURL}/accept-request`, { requesterId });
      useWS.current.send(JSON.stringify({ contactInfoData: data, type: 'res-accept-pending-request' }));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deletePendingRequest = createAsyncThunk(
  'contact/deletePending',
  async ({ requesterId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.put(`${baseURL}/delete-pending-request`, { requesterId: requesterId });
      return data;
    } catch (error) {
      rejectWithValue(error.response?.data);
    }
  }
);

export const postSendBlock = createAsyncThunk('contact/postSendBlock', async ({ contactId }, { rejectWithValue }) => {
  try {
    const { data } = await axiosClient.post(`${baseURL}/send-block`, { blockedContactId: contactId });
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

export const deleteBlockedContact = createAsyncThunk(
  'contact/deleteBlockedContact',
  async ({ contactId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.put(`${baseURL}/delete-blocked-contact`, { blockedContactId: contactId });
      return data;
    } catch (error) {
      rejectWithValue(error.response?.data);
    }
  }
);
