import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const useLogin = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [errorInput, setErrorInput] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  // Utilisez useSelector pour sélectionner spécifiquement l'état ou la propriété indiquant si l'utilisateur est connecté
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Exemple: ajustez selon votre structure de state

  // Rediriger vers la page d'accueil si l'utilisateur est authentifié
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const validate = () => {
    let error = {};

    if (!userInfo.email) {
      error.email = "Email is required";
    }
    if (!userInfo.password) {
      error.password = "Password is required";
    }

    setErrorInput(error);
    return Object.keys(error).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsError(false);
    const isValid = validate();

    if (!isValid) return;

    setIsLoading(true);
    axios
      .post("/api/user/login", userInfo)
      .then(() => navigate("/"))
      .catch((err) => {
        setIsError(err.response ? err.response.data : 'An error occurred');
      })
      .finally(() => setIsLoading(false));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  return { userInfo, errorInput, isLoading, isError, handleChange, onSubmit };
};

export default useLogin;
