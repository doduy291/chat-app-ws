import { axiosClient } from '../configs/axios.config';

const baseURL = '/api/message';

export const fetchGetMessageChannel = async ({ channelId, skipMsg = 0, setMessages }) => {
  try {
    const res = await axiosClient.get(`${baseURL}/${channelId}?skipMsg=${skipMsg}`);
    if (res.status === 200) {
      setMessages(res.data);
      console.log(res.data);
    }
  } catch (error) {
    console.log(error.reponse?.data);
  }
};
