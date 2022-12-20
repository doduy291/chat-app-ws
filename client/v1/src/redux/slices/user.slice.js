import { createSlice } from '@reduxjs/toolkit';
import { getUserInfo } from '../actions/user.action';

const initialState = {
  user: {},
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
      const { _id, username, avatar } = action.payload.user;
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = { _id, username, avatar };
    },
    [getUserInfo.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

const { reducer } = userSlice;
// export const {} = actions;
export default reducer;
