import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { setAnnonce } from "../features/annonce/annonceSlice";
import { setPanier } from "../features/panier/panierSlice";
import { setCommande } from "../features/commande/commandeSlice";
import axios from "axios";

const useInit = () => {
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setisLoading(() => true);
    axios
      .get("/api/user")
      .then((res) => {
        if (res.data.user) {
          dispatch(setUser(res.data.user));
          dispatch(setAnnonce(res.data.annonces));
          dispatch(setPanier(res.data.produitPaniers));
          dispatch(setCommande(res.data.commandes));
        } else {
          dispatch(setUser(""));
        }
      })
      .catch((err) => dispatch(setUser("")))
      .finally(() => setisLoading(() => false));
  }, [dispatch]);

  return { isLoading };
};
export default useInit;
