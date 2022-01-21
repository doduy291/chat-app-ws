import { createSlice } from '@reduxjs/toolkit';
import { postLogin, postSignup, getLogout } from '../actions/auth.action';

const initialState = {
  isLogged: false,
  isLoading: false,
  errorMsg: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearErrorMsg: (state) => {
      state.errorMsg = null;
    },
  },
  extraReducers: {
    [postLogin.fulfilled]: (state, action) => {
      state.isLogged = true;
      state.isLoading = false;
    },
    [postLogin.rejected]: (state, action) => {
      state.isLogged = false;
      state.isLoading = false;
      state.errorMsg = action.payload?.message;
    },
    [postSignup.fulfilled]: (state, action) => {
      state.isLogged = true;
      state.isLoading = false;
    },
    [postSignup.rejected]: (state, action) => {
      state.isLogged = false;
      state.isLoading = false;
      state.errorMsg = action.payload?.message;
    },
    [getLogout.fulfilled]: (state) => {
      state.isLogged = false;
    },
    [getLogout.rejected]: (state, action) => {
      state.errorMsg = action.payload?.message;
    },
  },
});

const { reducer, actions } = authSlice;
export const { clearErrorMsg } = actions;
export default reducer;
