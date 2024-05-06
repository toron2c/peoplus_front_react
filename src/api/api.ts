import axios from "axios";
import { ILogin } from "../models/ILogin";

const instance = axios.create({
  baseURL: "http://localhost:3333/",
});

export const apiRegistration = async (data: ILogin) => {
  return instance.post("auth/register", data);
};

export const apiLogin = async (data: ILogin) => {
  return await instance.post("auth/login", data);
};
