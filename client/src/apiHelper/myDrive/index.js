import { apiRequest } from "..";

export const getFilesApiHelper = async (payload) => {
  const { search, sortBy } = payload;

  return await apiRequest({
    url: `files?search=${search}&sortBy=${sortBy}`,
    method: "GET",
  });
};

export const uploadFileApiHelper = async (payload) => {
  return await apiRequest({
    url: "files",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: payload,
  });
};
