import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPanier } from "../../features/panier/panierSlice";
import axios from "axios";

const useDetail = () => {
  const { id } = useParams();
  const [annonce, setannonce] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [qteAchat, setqteAchat] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  // Récuperer l'annonce avec son id
  useEffect(() => {
    setloading(true);
    axios
      .get(`/api/annonce/${id}`)
      .then((res) => setannonce(res.data))
      .catch(() => seterror("erreur lors de chargement de l'annonce"))
      .finally(() => setloading(false));
  }, [id]);

  // ajoute un élement au panier
  const addToPanier = (id) => {
    seterror(false);
    if (!user)
      return seterror(
        "Vous devez être connecter pour ajouter un élement a votre panier"
      );

    const annonce = { annonce: id, qteAchat };
    setloading(true);
    axios
      .post("/api/panier", annonce)
      .then((res) => {
        console.log(res.data);
        dispatch(addPanier(res.data));
        navigate("/panier");
      })
      .catch((err) => console.log(err.response))
      .finally(() => setloading(false));
  };

  return { addToPanier, annonce, loading, error, qteAchat, setqteAchat };
};
export default useDetail;
