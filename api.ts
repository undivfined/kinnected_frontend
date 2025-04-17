import axios from "axios";
import { NewUser } from "./types/NewUserType";

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

export const getUserByUsername = (userName: string) => {
  return api.get(`/users/${userName}`).then(({ data: { user } }) => {
    return user;
  });
};

export const postNewUser = (newUser: NewUser) => {
  return api.post("/users", newUser).then(({ data: { user } }) => {
    return user;
  });
};
