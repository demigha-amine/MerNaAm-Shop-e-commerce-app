import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaCartArrowDown,
  FaList,
  FaConciergeBell,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deconnexion } from "../features/auth/authSlice";
import { useState } from "react";
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
      })
      .catch((err) => console.log(err.response || err))
      .finally(() => setisLoading(false));
  };

  return (
    <>
      {isLoading && <Spinner />}
      <nav className="navbar navbar-expand-md navbar-dark bg-custom py-3 mb-5" style={{borderRadius:"4px", boxShadow: '0 2px 4px rgba(0,0,0,0.2)'}}>
        <div className="container">
        <Link to="/" className="navbar-brand">
          <img src="/logo.png" alt="mernaamShop" style={{ height: "80px", marginLeft:"-40%" }} />
        </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto gap-3">
              {user ? (
                <>
                  <div className="d-none d-md-flex">
                    <li className="nav-item">
                      <Link to="" className="nav-link">
                        <FaCartArrowDown /> Panier 
                      </Link>
                    </li>
                    <li className="nav-item dropdown">
                      <span
                        role="button"
                        className="nav-link"
                        data-bs-toggle="dropdown"
                      >
                        {user.fullname}
                      </span>
                      <ul className="dropdown-menu dropdown-menu-dark">
                        {/* <li>
                          <Link to="/profile" className="dropdown-item">
                            <FaUser /> Mon profile
                          </Link>
                        </li> */}
                        <li>
                          <Link to="" className="dropdown-item">
                            <FaList /> Annonce 
                          </Link>
                        </li>
                        <li>
                          <Link to="" className="dropdown-item">
                            <FaConciergeBell /> Commande 
                          </Link>
                        </li>
                        <li onClick={() => onLogout()}>
                          <Link to="/" className="dropdown-item">
                            <FaSignOutAlt /> Logout
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </div>
                  <div className="d-md-none">
                    {/* <li className="nav-item">
                      <Link to="/profile" className="nav-link">
                        <FaUser /> Mon profile
                      </Link>
                    </li> */}

                    <li className="nav-item" onClick={() => onLogout()}>
                      <Link to="/" className="nav-link">
                        <FaSignOutAlt /> Logout
                      </Link>
                    </li>
                  </div>
                </>
              ) : (
                <>
                  <li className="nav-item" >
                    <Link to="/login" className="nav-link text-black">
                      <FaSignInAlt style={{color: "black",}}  /> <span className="text-black">Login</span>
                    </Link>
                  </li>
                  <li className="nav-item black-color">
                    <Link to="/register" className="nav-link text-black ">
                      <FaUser style={{color: "black",}}/> <span className="text-black">Register</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;