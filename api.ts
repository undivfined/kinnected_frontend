import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:9090/api",
  timeout: 1000,
});

export const getCredentials = ( userName: string) => {
    return api.get(`/users/${userName}/credentials`).then((response) => {
          return response.data.credential
    })
  }
