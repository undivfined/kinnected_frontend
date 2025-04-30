import axios from "axios";
import { NewUser } from "./types/NewUserType";
import { NewConnectionType } from "./types/NewConnectionType";
import { NewCard } from "./types/NewCardType";

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

export const postNewCard = (newCard: NewCard) => {
  return api.post("/cards", newCard).then(({ data: { card } }) => {
    return card;
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

export const editConnection = (
  connection_id: number,
  body: { [key: string]: string | undefined }
) => {
  return api
    .patch(`/connections/${connection_id}`, body)
    .then(({ data: { updatedConnection } }) => {
      return updatedConnection;
    });
};

export const editCard = (
  card_id: number,
  body: { [key: string]: string | undefined }
) => {
  return api.patch(`/cards/${card_id}`, body).then(({ data: { card } }) => {
    return card;
  });
};

export const deleteOwnAccount = (username: string) => {
  return api.delete(`/users/${username}`);
};

export const editAccountDetails = (
  username: string,
  body: { [key: string]: string }
) => {
  return api.patch(`/users/${username}`, body).then(({ data: { user } }) => {
    return user;
  });
};
