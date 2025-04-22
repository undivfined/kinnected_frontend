import axios from "axios";
import { NewUser } from "./types/NewUserType";
import { NewConnectionType } from "./types/NewConnectionType";

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

export const getUsers = (search: string) => {
  return api.get(`/users?search=${search}`).then(({ data: { users } }) => {
    return users;
  });
};

export const postConnection = (connection: NewConnectionType) => {
  return api
    .post(`/connections`, connection)
    .then(({ data: { createdConnection } }) => {
      return createdConnection;
    });
};

export const deleteConnection = (connection_id: number) => {
  return api.delete(`/connections/${connection_id}`);
};

export const deleteCard = (card_id: number) => {
  return api.delete(`/cards/${card_id}`);
};
