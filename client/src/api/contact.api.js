import { axiosClient } from '../configs/axios.config';

const baseURL = '/api/contact';

export const fetchGetAllContacts = async (setContacts) => {
  try {
    const res = await axiosClient.get(`${baseURL}/all-contacts`);
    if (res.status === 200) {
      setContacts(res.data?.allContacts?.contacts);
    }
  } catch (error) {
    console.log(error.response?.data);
  }
};

export const fetchGetPendingRequests = async (setPendings) => {
  try {
    const res = await axiosClient.get(`${baseURL}/pendings`);
    if (res.status === 200) {
      setPendings(res.data?.pendings?.contactRequests);
    }
  } catch (error) {
    console.log(error.response?.data);
  }
};
