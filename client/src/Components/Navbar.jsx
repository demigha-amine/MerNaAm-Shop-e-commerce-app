import React, { useState } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deconnexion } from "../features/auth/authSlice";
import { resetAnnonce } from "../features/annonce/annonceSlice";
import { resetCommande } from "../features/commande/commandeSlice";
import { resetPanier } from "../features/panier/panierSlice";
import axios from "axios";
import Spinner from "./Spinner";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const [isLoading, setisLoading] = useState(false);

  const onLogout = () => {
    setisLoading(true);
    axios
      .delete("/api/user/logout")
      .then(() => {
        dispatch(deconnexion());
        dispatch(resetAnnonce());
        dispatch(resetCommande());
        dispatch(resetPanier());
      })
      .catch((err) => console.log(err.response || err))
      .finally(() => setisLoading(false));
  };

  return (
    <>
      {isLoading && <Spinner />}
      <nav
        className="navbar navbar-expand-md navbar-dark py-3 mb-5"
        style={{ background: "linear-gradient(to right, #ee723aed, #77aad9)" }}
      >
        <div className="container" style={{ height: "66px" }}>
          <Link to="/" className="navbar-brand">
            <img
              src="/logo.png"
              alt=""
              style={{ height: "113px", marginLeft: "-111%", width: "174%" }}
            />
          </Link>

          <div
            className="collapse navbar-collapse"
            id="navbarNav"
            style={{ marginLeft: "" }}
          >
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link" style={{ color: "black" }}>
                  Accueil
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/panier"
                  className="nav-link"
                  style={{ color: "black", marginLeft: "20px" }}
                >
                  Panier
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/annonce"
                  className="nav-link"
                  style={{ color: "black", marginLeft: "20px" }}
                >
                  Produit
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/commande"
                  className="nav-link"
                  style={{ color: "black", marginLeft: "20px" }}
                >
                  commande
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              {!user && (
                <li className="nav-item">
                  <Link
                    to="/register"
                    className="nav-link"
                    style={{ color: "black" }}
                  >
                    <FaUser /> Register
                  </Link>
                </li>
              )}
              {user && (
                <li className="nav-item">
                  <span className="nav-link" style={{ color: "black" }}>
                    <FaUser /> {user.fullname}
                  </span>
                </li>
              )}
              <li className="nav-item">
                {user ? (
                  <span
                    className="nav-link"
                    onClick={onLogout}
                    style={{ color: "black" }}
                  >
                    <FaSignOutAlt /> Logout
                  </span>
                ) : (
                  <Link
                    to="/login"
                    className="nav-link"
                    style={{ color: "black" }}
                  >
                    <FaUser /> Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
