import { createSlice } from '@reduxjs/toolkit';
import { getListChannels } from '../actions/channel.action';

const initialState = {
  isLoading: true,
  channels: [],
};

const channelSlice = createSlice({
  name: 'channel',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getListChannels.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.channels = action.payload?.channels;
    },
  },
});

const { reducer } = channelSlice;
export default reducer;
