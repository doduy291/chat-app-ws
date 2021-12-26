import { createSlice } from '@reduxjs/toolkit';
import { getListDMs, getListGroupChannels } from '../actions/channel.action';

const initialState = {
  isLoading: true,
  channels: [],
  DMs: [],
};

const channelSlice = createSlice({
  name: 'channel',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getListDMs.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.DMs = action.payload?.channels;
    },
    [getListGroupChannels.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.channels = action.payload?.channels;
    },
  },
});

const { reducer } = channelSlice;
export default reducer;
