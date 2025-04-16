import axios from "axios";

const api = axios.create({
  baseURL: "https://kinnected-server.onrender.com/api",
  timeout: 1000,
});

export const getCredentials = (userName: string) => {
  return api.get(`/users/${userName}/credentials`).then((response) => {
    return response.data.credential;
  });
};

export const getContacts = (userName: string) => {
  return api.get(`/users/${userName}/contacts`).then((response) => {
    return response.data.contacts;
  });
};
