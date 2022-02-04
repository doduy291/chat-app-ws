import useSWR from 'swr';
import { fetcher, revalidatedOptions } from '../configs/swr.config';

const baseURL = '/api/contact';
const contactService = {
  useGetAllContacts: () => {
    const { data, error, mutate } = useSWR(`${baseURL}/all-contacts`, fetcher, revalidatedOptions);
    return { data: data?.allContacts, error, mutate };
  },
  useGetBlockedContacts: () => {
    const { data, error, mutate } = useSWR(`${baseURL}/blocked-contacts`, fetcher, revalidatedOptions);
    return { data: data?.blockedContacts, error, mutate };
  },
  useGetPendingRequests: () => {
    const { data, error, mutate } = useSWR(`${baseURL}/pendings`, fetcher, revalidatedOptions);
    return { data: data?.pendings?.contactRequests, error, mutate };
  },
};
export default contactService;
