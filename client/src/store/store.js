import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import accueilReducer from "../features/accueil/accueilSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accueil: accueilReducer,
  },
});
