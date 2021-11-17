import { createSlice } from '@reduxjs/toolkit';
import { getUserInfo } from '../actions/user.action';

const initialState = {
  isAuthenticated: false,
  username: '',
  avatar: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [getUserInfo.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.user.username;
      state.avatar = action.payload.user.avatar;
    },
  },
});

const { reducer } = userSlice;
// export const {} = actions;
export default reducer;
