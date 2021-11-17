import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth.slice';
import userReducer from './slices/user.slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
