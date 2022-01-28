import useSWR from 'swr';
import { axiosClient } from '../configs/axios.config';
import { fetcher, revalidatedOptions } from '../configs/swr.config';

const baseURL = '/api/message';

export const useGetMessageChannel = ({ channelId, skipMsg = 0 }) => {
  const { data, error } = useSWR(`${baseURL}/${channelId}?skipMsg=${skipMsg}`, fetcher, revalidatedOptions);
  return { data, error };
};

// export const fetchGetMessageChannel = async ({ channelId, skipMsg = 0, setMessages }) => {
//   try {
//     const res = await axiosClient.get(`${baseURL}/${channelId}?skipMsg=${skipMsg}`);
//     if (res.status === 200) {
//       setMessages(res.data);
//       console.log(res.data);
//     }
//   } catch (error) {
//     console.log(error.reponse?.data);
//   }
// };
