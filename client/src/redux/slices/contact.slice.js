import { createSlice } from '@reduxjs/toolkit';
import { getAllContacts, getPendingRequest, postAcceptRequest } from '../actions/contact.action';

const initialState = {
  isLoading: true,
  pendings: [],
  contacts: [],
  errorMsg: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getAllContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.contacts = action.payload?.allContacts?.contacts;
    },
    [getAllContacts.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMsg = action.payload?.message;
    },
    [getPendingRequest.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.pendings = action.payload?.pendings?.contactRequests;
    },
    [getPendingRequest.rejected]: (state, action) => {
      state.isLoading = false;
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
  },
});

const { reducer } = contactSlice;
export default reducer;
