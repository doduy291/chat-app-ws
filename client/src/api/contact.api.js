import { axiosClient } from '../configs/axios.config';

const baseURL = '/api/contact';

export const fetchGetAllContacts = async (setAllContacts) => {
  try {
    const res = await axiosClient.get(`${baseURL}/all-contacts`);
    if (res.status === 200) {
      setAllContacts(res.data?.allContacts);
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

export const fetchGetBlockedContacts = async (setBlockedContacts) => {
  try {
    const res = await axiosClient.get(`${baseURL}/blocked-contacts`);
    if (res.status === 200) {
      setBlockedContacts(res.data?.blocks.blockedContacts);
    }
  } catch (error) {
    console.log(error.response?.data);
  }
};
