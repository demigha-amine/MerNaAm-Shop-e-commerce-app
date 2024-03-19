import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/auth/authSlice";
import { setAnnonce } from "../../features/annonce/annonceSlice";
import { setPanier } from "../../features/panier/panierSlice";
import { setCommande } from "../../features/commande/commandeSlice";
import axios from "axios";

const useLogin = () => {
  const [userInfo, setuserInfo] = useState({
    email: "",
    password: "",
  });
  const [errorInput, seterrorInput] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const user = useSelector((state) => state.auth);
  // si l'utilisateur est déja connecté, il est redirecter vers la page d'accueil
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  // valide le formulaire de connexion
  const validate = () => {
    //validate input
    let error = {};

    if (userInfo.email === "") {
      //validate email
      error.email = "Email is required";
    }
    if (userInfo.password === "") {
      //validate password
      error.password = "Password is required";
    }
    seterrorInput(error);
    return error;
  };

  // submit de formulaire pour la connexion
  const onSubmit = (e) => {
    e.preventDefault();
    setisError(false);
    const error = validate();

    if (Object.keys(error).length !== 0) {
      return;
    }

    setisLoading(true);
    axios
      .post("/api/user/login", userInfo)
      .then((res) => {
        console.log(res);
        dispatch(setUser(res.data.user));
        dispatch(setAnnonce(res.data.annonces));
        dispatch(setPanier(res.data.produitPaniers));
        dispatch(setCommande(res.data.commandes));
        navigate(from, { replace: true });
      })
      .catch((err) => setisError(err.response.data))
      .finally(() => setisLoading(false));
  };

  // handle le changement des inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserInfo((userInfo) => ({ ...userInfo, [name]: value }));
  };

  return { userInfo, errorInput, isLoading, isError, handleChange, onSubmit };
};

export default useLogin;
