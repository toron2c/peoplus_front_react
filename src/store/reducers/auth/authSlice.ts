import { createSlice } from "@reduxjs/toolkit";
import { ITokens } from "../../../models/ITokens";
import { login, registration } from "./authActions";

interface AuthState {
  email: string;
  password: string;
  loading: boolean;
  error: string | undefined;

  tokens: ITokens;
}

const initialState: AuthState = {
  email: "",
  error: "",
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
    },
    updatePassword(state, action) {
      state.password = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(registration.fulfilled, (state, action) => {
      state.email = "";
      state.password = "";
      state.error = "";
      state.tokens = action.payload.tokens;
      state.loading = false;
    });
    builder.addCase(registration.pending, (state, action) => {
      state.error = "";
      state.loading = true;
    });
    builder.addCase(registration.rejected, (state, action) => {
      state.error = "error";
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.email = "";
      state.password = "";
      state.error = "";
      state.loading = false;
      state.tokens = action.payload.tokens;
    });
    builder.addCase(login.pending, (state, action) => {
      state.email = "";
      state.password = "";
      state.error = "";
      state.loading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload?.message;
      state.loading = true;
    });
  },
});

export default authSlice.reducer;
export const { updateEmail, updatePassword } = authSlice.actions;
