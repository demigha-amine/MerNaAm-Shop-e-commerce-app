import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removePanier } from "../../features/panier/panierSlice";
import axios from "axios";

const usePanier = () => {
  const listPanier = useSelector((state) => state.panier);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // calcul du total
  const total = listPanier.reduce((acc, cur) => {
    return acc + cur.annonce.prix * cur.qteAchat;
  }, 0);

  // redirect vers la page de payement en ligne
  const checkout = () => {
    if (listPanier.length === 0) return setisError("Votre panier est vide");

    setisLoading(true);
    axios
      .post("/api/commande/checkout", listPanier)
      .then((res) => (window.location = res.data.url))
      .catch((err) => console.log(err.response))
      .finally(() => setisLoading(false));
  };

  // Supprime l'annonce du panier
  const deleteFromPanier = (id) => {
    setisLoading(true);
    axios
      .delete(`/api/panier/${id}`)
      .then(() => {
        dispatch(removePanier(id));
      })
      .catch((err) => console.log(err.response))
      .finally(() => setisLoading(false));
  };

  // nous envoie vers la page de détails d'une annonce pour mettre à jours la Qte
  const updateInPanier = (url) => navigate(url);

  return {
    listPanier,
    isLoading,
    isError,
    total,
    checkout,
    deleteFromPanier,
    updateInPanier,
  };
};
export default usePanier;
