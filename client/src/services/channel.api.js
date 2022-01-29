import useSWR from 'swr';
import { fetcher, revalidatedOptions } from '../configs/swr.config';

const baseURL = '/api/channel';
const channelService = {
  useGetDetailChannel: (channelId) => {
    const { data, error, mutate } = useSWR(`${baseURL}/${channelId}`, fetcher, revalidatedOptions);
    return { data: data?.channel, error, mutate };
  },
  useGetListDirectChannels: () => {
    const { data, error } = useSWR(`${baseURL}/list-DMs`, fetcher, revalidatedOptions);
    return { data: data?.channels, error };
  },
  useGetListGroupChannels: () => {
    const { data, error, mutate } = useSWR(`${baseURL}/list-group-channels`, fetcher, revalidatedOptions);
    return { data: data?.channels, error, mutate };
  },
};
export default channelService;
