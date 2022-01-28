import useSWR from 'swr';
import { fetcher, revalidatedOptions } from '../configs/swr.config';

const baseURL = '/api/contact';

export const useGetAllContacts = () => {
  const { data, error } = useSWR(`${baseURL}/all-contacts`, fetcher, revalidatedOptions);
  return { data: data?.allContacts, error };
};
export const useGetBlockedContacts = () => {
  const { data, error } = useSWR(`${baseURL}/blocked-contacts`, fetcher, revalidatedOptions);
  return { data: data?.blockedContacts, error };
};
export const useGetPendingRequests = () => {
  const { data, error } = useSWR(`${baseURL}/pendings`, fetcher, revalidatedOptions);
  return { data: data?.pendings?.contactRequests, error };
};
