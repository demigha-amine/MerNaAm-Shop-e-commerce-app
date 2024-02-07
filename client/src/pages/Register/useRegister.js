import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useRegister = () => {
  const [userInfo, setuserInfo] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorInput, seterrorInput] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    file: "",
  });

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  // si l'utilisateur est déja connecté, il est redirecter vers la page d'accueil
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  // valide le formulaire d'inscription
  const validate = () => {
    //validate input
    let error = {};
    if (userInfo.fullname === "") {
      //validate fullname
      error.fullname = "Fullname is required";
    }
    if (userInfo.email === "") {
      //validate email
      error.email = "Email is required";
    }
    if (userInfo.password === "") {
      //validate password
      error.password = "Password is required";
    }

    if (userInfo.password.length < 6) {
      // validate password
      error.password = "Password must be at least 6 characters long";
    }
    if (userInfo.confirmPassword === "") {
      //validate confirm password
      error.confirmPassword = "Confirm password is required";
    }

    if (userInfo.password !== userInfo.confirmPassword) {
      //validate confirm password
      error.confirmPassword = "Confirm password is not match";
    }
    seterrorInput(error);
    return error;
  };

  // submit de formulaire pour l'inscription
  const onSubmit = (e) => {
    e.preventDefault();
    seterror(false);
    const error = validate();

    if (Object.keys(error).length !== 0) {
      return;
    }

    setloading(true);
    axios
      .post("/api/user/signup", userInfo)
      .then(() => navigate("/login"))
      .catch((err) => seterror("l'adresse email existe déja"))
      .finally(() => setloading(false));
  };

  // handle le changement des inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserInfo((userInfo) => ({ ...userInfo, [name]: value }));
  };

  return {
    userInfo,
    errorInput,
    loading,
    error,
    onSubmit,
    handleChange,
  };
};
export default useRegister;
