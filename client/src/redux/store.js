import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth.slice';
import userReducer from './slices/user.slice';
import contactReducer from './slices/contact.slice';
import messageReducer from './slices/message.slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    contact: contactReducer,
    message: messageReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
