import { axiosClient } from '../configs/axios.config';

const baseURL = '/api/channel';

export const fetchGetDetailChannel = async (channelId, setDetailChannel) => {
  try {
    const res = await axiosClient.get(`${baseURL}/${channelId}`);
    if (res.status === 200) {
      setDetailChannel(res.data?.channel);
    }
  } catch (error) {
    console.log(error.response?.data);
  }
};

export const fetchGetListDMs = async (setDMs) => {
  try {
    const res = await axiosClient.get(`${baseURL}/list-DMs`);
    if (res.status === 200) {
      setDMs(res.data?.channels);
    }
  } catch (error) {
    console.log(error.response?.data);
  }
};

export const fetchGetListGroupChannels = async (setGroups) => {
  try {
    const res = await axiosClient.get(`${baseURL}/list-group-channels`);
    if (res.status === 200) {
      setGroups(res.data?.channels);
    }
  } catch (error) {
    console.log(error.response?.data);
  }
};
