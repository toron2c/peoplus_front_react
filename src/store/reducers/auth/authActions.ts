import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuth } from "../../../models/IAuth";
import { apiLogin, apiRegistration } from "../../../api/api";
import { IResponseAuth } from "../../../models/IResponseAuth";
export interface IError {
  message: string;
  error: string;
  statusCode: number;
}
export const registration = createAsyncThunk<
  IResponseAuth,
  IAuth,
  {
    rejectValue: IError;
  }
>("auth/registration", async (data: IAuth, thunkApi) => {
  try {
    const res = await apiRegistration(data);
    return res.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data.message);
  }
});

export const login = createAsyncThunk<
  IResponseAuth,
  IAuth,
  {
    rejectValue: IError;
  }
>("auth/login", async (data: IAuth, thunkApi) => {
  try {
    const res = await apiLogin(data);
    return res.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});
