import { createSlice } from '@reduxjs/toolkit';
import { postAcceptRequest, deletePendingRequest, postSendRequest } from '../actions/contact.action';

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
    [postSendRequest.fulfilled]: (state, action) => {
      state.success = true;
    },
    [postSendRequest.fulfilled]: (state, action) => {
      state.success = false;
      state.errorMsg = action.payload?.message;
    },
    [postAcceptRequest.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.success = true;
    },
    [postAcceptRequest.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMsg = action.payload?.message;
    },
    [deletePendingRequest.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.success = true;
    },
    [deletePendingRequest.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMsg = action.payload?.message;
    },
  },
});

const { reducer } = contactSlice;
export default reducer;
