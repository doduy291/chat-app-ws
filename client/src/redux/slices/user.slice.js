import { createSlice } from '@reduxjs/toolkit';
import { getUserInfo } from '../actions/user.action';

const initialState = {
  username: '',
  avatar: '',
  isLoading: true,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [getUserInfo.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getUserInfo.fulfilled]: (state, action) => {
      const { username, avatar } = action.payload.user;
      state.isLoading = false;
      state.isAuthenticated = true;
      state.username = username;
      state.avatar = avatar;
    },
    [getUserInfo.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

const { reducer } = userSlice;
// export const {} = actions;
export default reducer;
