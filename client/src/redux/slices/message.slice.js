import { createSlice } from '@reduxjs/toolkit';
import { getMessageChannel } from '../actions/message.action';

const initialState = {
  isLoading: true,
  messages: [],
};

const messageSlice = createSlice({
  name: 'message',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getMessageChannel.fulfilled]: (state, action) => {
      state.messages = action.payload;
    },
  },
});

const { reducer } = messageSlice;
export default reducer;
