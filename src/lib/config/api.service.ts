import axiosInstance from "./axios.config";

// GET
export const getData = async (url: string, params?: any) => {
 const response = await axiosInstance.get(url, { params });
 return response.data;
};

// POST
export const postData = async (url: string, data: any) => {
 const response = await axiosInstance.post(url, data);
 return response.data;
};

// PUT
export const putData = async (url: string, data: any) => {
 const response = await axiosInstance.put(url, data);
 return response.data;
};

// DELETE
export const deleteData = async (url: string) => {
 const response = await axiosInstance.delete(url);
 return response.data;
};

