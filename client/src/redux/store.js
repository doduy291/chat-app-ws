import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth.slice';
import userReducer from './slices/user.slice';
import contactReducer from './slices/contact.slice';
import channelReducer from './slices/channel.slice';
import messageReducer from './slices/message.slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    contact: contactReducer,
    channel: channelReducer,
    message: messageReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
