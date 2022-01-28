import useSWR from 'swr';
import { fetcher, revalidatedOptions } from '../configs/swr.config';

const baseURL = '/api/channel';

export const useGetDetailChannel = (channelId) => {
  const { data, error } = useSWR(`${baseURL}/${channelId}`, fetcher, revalidatedOptions);
  return { data: data?.channel, error };
};
export const useGetListDirectChannels = () => {
  const { data, error } = useSWR(`${baseURL}/list-DMs`, fetcher, revalidatedOptions);
  return { data: data?.channels, error };
};
export const useGetListGroupChannels = () => {
  const { data, error, mutate } = useSWR(`${baseURL}/list-group-channels`, fetcher, revalidatedOptions);
  return { data: data?.channels, error, mutate };
};
