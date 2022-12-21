import { createSlice } from '@reduxjs/toolkit';
import { postSendMessage } from '../actions/message.action';

const initialState = {
  isSent: false,
  errorMsg: null,
  messagesStorage: {},
};

const messageSlice = createSlice({
  name: 'message',
  initialState: initialState,
  reducers: {
    setMessagesStorage: (state, action) => {
      // console.log(action.payload);
      const { channelId, messages } = action.payload;
      let messagesStorage = {};
      messagesStorage[channelId] = messages;
      return { messagesStorage };
    },
  },
  extraReducers: {
    [postSendMessage.fulfilled]: (state, action) => {
      state.isSent = true;
    },
    [postSendMessage.rejected]: (state, action) => {
      state.isSent = false;
    },
  },
});

const { reducer, actions } = messageSlice;
export const { setMessagesStorage } = actions;
export default reducer;
