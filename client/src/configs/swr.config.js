import { axiosClient } from './axios.config';

export const fetcher = (url) => axiosClient.get(url).then((res) => res.data);

// Disable Automatic Revalidations
export const revalidatedOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};
