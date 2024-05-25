import { createSlice } from "@reduxjs/toolkit";
import { ITokens } from "../../../models/ITokens";
import { login, registration } from "./authActions";

interface AuthState {
  email: string;
  password: string;
  loading: boolean;
  isError: boolean;
  error: string | null;

  tokens: ITokens;
}

const initialState: AuthState = {
  email: "",
  isError: false,
  error: null,
  loading: false,
  password: "",
  tokens: { accessToken: "", refreshToken: "" },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateEmail(state, action) {
      state.email = action.payload;
      if (state.isError) {
        state.isError = false;
        state.error = null;
      }
    },
    updatePassword(state, action) {
      state.password = action.payload;
      if (state.isError) {
        state.isError = false;
        state.error = null;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(registration.fulfilled, (state, action) => {
      state.email = "";
      state.password = "";
      state.error = null;

      state.tokens = action.payload.tokens;

      state.loading = false;
      state.isError = false;
    });
    builder.addCase(registration.pending, (state, action) => {
      state.error = null;
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(registration.rejected, (state, action) => {
      if (typeof action.payload === "string") {
        state.error = action.payload;
        state.isError = true;
      } else {
        state.isError = true;
        state.error = "error";
      }
      state.loading = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.email = "";
      state.password = "";
      state.error = null;

      state.tokens = action.payload.tokens;

      state.loading = false;
      state.isError = false;
    });
    builder.addCase(login.pending, (state, action) => {
      state.email = "";
      state.password = "";

      state.error = null;

      state.loading = true;
      state.isError = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      if (typeof action.payload === "string") {
        state.error = action.payload;
        state.isError = true;
      } else {
        state.isError = true;
        state.error = "error";
      }
      state.loading = true;
    });
  },
});

export default authSlice.reducer;
export const { updateEmail, updatePassword } = authSlice.actions;
