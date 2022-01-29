import { createSlice } from '@reduxjs/toolkit';
import {
  postAcceptRequest,
  deletePendingRequest,
  postSendRequest,
  postSendBlock,
  deleteBlockedContact,
} from '../actions/contact.action';

const initialState = {
  isLoading: true,
  success: false,
  errorMsg: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [postSendRequest.fulfilled]: (state) => {
      state.success = true;
    },
    [postSendRequest.rejected]: (state, action) => {
      state.errorMsg = action.payload.message;
    },
    [postAcceptRequest.fulfilled]: (state) => {
      state.success = true;
    },
    [postAcceptRequest.rejected]: (state, action) => {
      state.errorMsg = action.payload.message;
    },
    [deletePendingRequest.fulfilled]: (state) => {
      state.success = true;
    },
    [deletePendingRequest.rejected]: (state, action) => {
      state.errorMsg = action.payload.message;
    },
    [postSendBlock.fulfilled]: (state) => {
      state.success = true;
    },
    [postSendBlock.rejected]: (state, action) => {
      state.errorMsg = action.payload.message;
    },
    [deleteBlockedContact.fulfilled]: (state) => {
      state.success = true;
    },
    [deleteBlockedContact.rejected]: (state, action) => {
      state.errorMsg = action.payload.message;
    },
  },
});

const { reducer } = contactSlice;
export default reducer;
