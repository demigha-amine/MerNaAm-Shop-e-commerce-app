import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import accueilReducer from "../features/accueil/accueilSlice";
import panierReducer from "../features/panier/panierSlice";
import commandeReducer from "../features/commande/commandeSlice";
import annonceReducer from "../features/annonce/annonceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    annonce: annonceReducer,
    panier: panierReducer,
    accueil: accueilReducer,
    commande: commandeReducer,
  },
});
