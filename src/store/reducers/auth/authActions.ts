import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILogin } from "../../../models/ILogin";
import { apiLogin, apiRegistration } from "../../../api/api";
import { IResponseAuth } from "../../../models/IResponseAuth";
export interface IError {
  message: string;
  error: string;
  statusCode: number;
}
export const registration = createAsyncThunk<
  IResponseAuth,
  ILogin,
  {
    rejectValue: IError;
  }
>("auth/registration", async (data: ILogin, thunkApi) => {
  try {
    const res = await apiRegistration(data);
    return res.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data.message);
  }
});

export const login = createAsyncThunk<
  IResponseAuth,
  ILogin,
  {
    rejectValue: IError;
  }
>("auth/login", async (data: ILogin, thunkApi) => {
  try {
    const res = await apiLogin(data);
    return res.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});
