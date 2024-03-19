import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  updateForm,
  addAnnonce,
  updateAnnonce,
  removeAnnonce,
  resetForm,
} from "../../features/annonce/annonceSlice";
import axios from "axios";

const useAnnonce = () => {
  const closeModal = useRef();
  const [isLoading, setisLoading] = useState(false);
  const [errorInput, seterrorInput] = useState({
    nomProduit: "",
    categorie: "",
    prix: "",
    description: "",
    qteDispo: "",
    file: "",
  });

  const dispatch = useDispatch();

  const { listAnnonce, form } = useSelector((state) => state.annonce);
  const [formAnnonce, setformAnnonce] = useState(form);

  // mise à jours des données du formulaire
  useEffect(() => {
    setformAnnonce(form);
  }, [form]);

  // mettre à jours le formulaire pour update une annonce
  const setForm = (annonce) => dispatch(updateForm(annonce));

  // validate the form
  const validate = () => {
    //validate input
    let error = {};

    if (formAnnonce.nomProduit === "") {
      //validate nomProduit
      error.nomProduit = "Nom du produit is required";
    }

    if (formAnnonce.nomProduit === "") {
      //validate categorie
      error.categorie = "categorie is required";
    }

    if (isNaN(formAnnonce.prix)) {
      //validate prix
      error.prix = "Valeur incorrect";
    }
    if (formAnnonce.prix === "") {
      //validate prix
      error.prix = "Prix is required";
    }

    if (formAnnonce.description === "") {
      //validate description
      error.description = "Description is required";
    }

    if (isNaN(formAnnonce.qteDispo)) {
      //validate qteDispo
      error.qteDispo = "Valeur incorrect";
    }

    if (formAnnonce.qteDispo === "") {
      //validate qteDispo
      error.qteDispo = "Qte disponible is required";
    }
    if (formAnnonce.file === "") {
      //validate file
      error.file = "Image is required";
    }
    seterrorInput(error);
    return error;
  };

  // si l'id existe, donc update sinon create
  const submitModal = () => {
    if (formAnnonce._id) {
      updateMyAnnonce();
    } else {
      createAnnonce();
    }
  };

  // create new annonce
  const createAnnonce = () => {
    const error = validate();

    if (Object.keys(error).length !== 0) {
      return;
    }

    const formData = new FormData();
    formData.append("nomProduit", formAnnonce.nomProduit);
    formData.append("categorie", formAnnonce.categorie);
    formData.append("prix", formAnnonce.prix);
    formData.append("description", formAnnonce.description);
    formData.append("qteDispo", formAnnonce.qteDispo);
    formData.append("file", formAnnonce.file);
    setisLoading(true);
    axios
      .post("/api/annonce", formData)
      .then((res) => {
        dispatch(resetForm());
        dispatch(addAnnonce(res.data));
        closeModal.current.click();
      })
      .catch((err) => console.log(err.response.data.message || err.response))
      .finally(() => setisLoading(false));
  };

  // supprimer une annonce
  const deleteAnnonce = (id) => {
    setisLoading(true);
    axios
      .delete(`/api/annonce/${id}`)
      .then((res) => dispatch(removeAnnonce(id)))
      .catch((err) => console.log(err.response))
      .finally(() => setisLoading(false));
  };

  // update annonce
  const updateMyAnnonce = () => {
    const error = validate();

    if (Object.keys(error).length !== 0) {
      return;
    }

    const formData = new FormData();
    formData.append("nomProduit", formAnnonce.nomProduit);
    formData.append("categorie", formAnnonce.categorie);
    formData.append("prix", formAnnonce.prix);
    formData.append("description", formAnnonce.description);
    formData.append("qteDispo", formAnnonce.qteDispo);
    if (formAnnonce.file) {
      formData.append("file", formAnnonce.file);
    }

    setisLoading(true);
    axios
      .put(`/api/annonce/${formAnnonce._id}`, formData)
      .then((res) => {
        dispatch(resetForm());
        dispatch(updateAnnonce(res.data));
        closeModal.current.click();
      })
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false));
  };

  // reset le formulaire après la fermeture du modal
  const resetModal = () => dispatch(resetForm());

  // handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setformAnnonce((formAnnonce) => ({ ...formAnnonce, [name]: files[0] }));
    } else {
      setformAnnonce((formAnnonce) => ({ ...formAnnonce, [name]: value }));
    }
  };

  // les options du select
  const selectOptions = [
    { key: "Select la catégorie", value: "" },
    { key: "accéssoire", value: "accéssoire" },
    { key: "vestimentaire", value: "vestimentaire" },
    { key: "éléctronique", value: "éléctronique" },
    { key: "appareil photographique", value: "appareil photographique" },
  ];

  return {
    listAnnonce,
    formAnnonce,
    submitModal,
    resetModal,
    deleteAnnonce,
    closeModal,
    setForm,
    isLoading,
    errorInput,
    handleChange,
    selectOptions,
  };
};
export default useAnnonce;
