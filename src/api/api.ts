import axios from "axios";
import { IAuth } from "../models/IAuth";

const instance = axios.create({
  baseURL: "http://localhost:3333/",
});

export const apiRegistration = async (data: IAuth) => {
  return await instance.post("auth/register", data);
};

export const apiLogin = async (data: IAuth) => {
  return await instance.post("auth/login", data);
};
