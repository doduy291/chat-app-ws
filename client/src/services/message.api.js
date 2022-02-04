import useSWR from 'swr';
import { fetcher, revalidatedOptions } from '../configs/swr.config';

const baseURL = '/api/message';
const messageService = {
  useGetMessageChannel: ({ channelId, skipMsg = 0 }) => {
    const { data, error, mutate } = useSWR(`${baseURL}/${channelId}?skipMsg=${skipMsg}`, fetcher, revalidatedOptions);
    return { data, error, mutate };
  },
};
export default messageService;
