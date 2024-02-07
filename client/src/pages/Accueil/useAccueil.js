import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAnnonces,
  setFiltre,
  reset,
} from "../../features/accueil/accueilSlice";
import axios from "axios";

const useAccueil = () => {
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();

  const { annonces, filtre, nbrPages } = useSelector((state) => state.accueil);
  const [name, setname] = useState(filtre.name);
  const [category, setcategory] = useState(filtre.category);

  // Récupere les annonces à l'ouverture du site et au changement du filtre
  useEffect(() => {
    setisLoading(true);
    let urlFiltre = `name=${filtre.name}&category=${filtre.category}&page=${filtre.page}`;
    axios
      .get(`/api/annonce?${urlFiltre}`)
      .then((res) => dispatch(setAnnonces(res.data)))
      .catch((err) => console.log(err.response))
      .finally(() => setisLoading(false));
  }, [dispatch, filtre]);

  // filtre les annonces
  const searchProduit = () => dispatch(setFiltre({ name, category }));

  // reset les filtres de recherche
  const resetSearch = () => {
    dispatch(reset());
    setname("");
    setcategory("");
  };

  // mets a jours la page de l'affichage
  const updatePage = (i) => dispatch(setFiltre({ page: i + 1 }));

  return {
    annonces,
    filtre,
    nbrPages,
    isLoading,
    name,
    category,
    searchProduit,
    resetSearch,
    updatePage,
    setname,
    setcategory,
  };
};

export default useAccueil;
