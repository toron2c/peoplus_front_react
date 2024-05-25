import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/auth/authSlice";
// import logger from "redux-logger";

const rootReducer = combineReducers({
  authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});
// .concat(logger)
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
