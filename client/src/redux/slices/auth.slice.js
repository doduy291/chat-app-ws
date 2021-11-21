import { createSlice } from '@reduxjs/toolkit';
import { postLogin, postSignup } from '../actions/auth.action';

const initialState = {
  isLogged: false,
  isLoading: false,
  errorMsg: '',
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [postLogin.fulfilled]: (state, action) => {
      state.isLogged = true;
      state.isLoading = false;
      state.errorMsg = '';
    },
    [postLogin.rejected]: (state, action) => {
      state.isLogged = false;
      state.isLoading = false;
      state.errorMsg = action.payload?.message;
    },
    [postSignup.fulfilled]: (state, action) => {
      state.isLogged = true;
      state.isLoading = false;
      state.errorMsg = '';
    },
    [postSignup.rejected]: (state, action) => {
      state.isLogged = false;
      state.isLoading = false;
      state.errorMsg = action.payload?.message;
    },
  },
});

const { reducer } = authSlice;
// export const {} = actions;
export default reducer;
