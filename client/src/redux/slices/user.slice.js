import { createSlice } from '@reduxjs/toolkit';
import { getUserInfo } from '../actions/user.action';

const initialState = {
  username: '',
  avatar: '',
  isLoading: true,
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
      state.isLoading = false;
      state.isAuthenticated = true;
      state.username = action.payload.user.username;
      state.avatar = action.payload.user.avatar;
    },
    [getUserInfo.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

const { reducer } = userSlice;
// export const {} = actions;
export default reducer;
