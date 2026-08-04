import axiosInstance from "./axiosInstance";

export const createContact = (data) =>
  axiosInstance.post("/contacts", data);

export const getContacts = (params) =>
  axiosInstance.get("/contacts", { params });

export const getContactById = (id) =>
  axiosInstance.get(`/contacts/${id}`);

export const updateContact = (id, data) =>
  axiosInstance.put(`/contacts/${id}`, data);

export const deleteContact = (id) =>
  axiosInstance.delete(`/contacts/${id}`);

export const getContactStats = () =>
  axiosInstance.get("/contacts/stats");