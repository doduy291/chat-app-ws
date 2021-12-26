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
