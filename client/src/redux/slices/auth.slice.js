import { createSlice } from '@reduxjs/toolkit';
import { postLogin, postSignup } from '../actions/auth.action';

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
      state.errorMsg = null;
    },
    [postLogin.rejected]: (state, action) => {
      state.isLogged = false;
      state.isLoading = false;
      state.errorMsg = action.payload?.message;
    },
    [postSignup.fulfilled]: (state, action) => {
      state.isLogged = true;
      state.isLoading = false;
      state.errorMsg = null;
    },
    [postSignup.rejected]: (state, action) => {
      state.isLogged = false;
      state.isLoading = false;
      state.errorMsg = action.payload?.message;
    },
  },
});

const { reducer, actions } = authSlice;
export const { clearErrorMsg } = actions;
export default reducer;
