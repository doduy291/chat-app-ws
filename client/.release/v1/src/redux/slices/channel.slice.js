import { createSlice } from '@reduxjs/toolkit';
import { postCreateChannel } from '../actions/channel.action';

const initialState = {
  isCreated: false,
  errorMsg: null,
};

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    // setErrorMsg: (state, action) => {
    //   state.errorMsg = action.payload;
    // },
    // clearErrorMsg: (state) => {
    //   state.errorMsg = null;
    // },
  },
  extraReducers: {
    [postCreateChannel.fulfilled]: (state, action) => {
      state.isCreated = true;
    },
    [postCreateChannel.rejected]: (state, action) => {
      state.isCreated = false;
      state.errorMsg = action.payload?.message;
    },
  },
});

const { reducer } = channelSlice;

export default reducer;
