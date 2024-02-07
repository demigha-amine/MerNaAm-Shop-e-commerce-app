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
      <nav className="navbar navbar-expand-md navbar-dark bg-dark py-3 mb-5">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <h1>Amir Shop</h1>
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
                      <Link to="/" className="nav-link">
                        <FaCartArrowDown /> 
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
                          <Link to="/" className="dropdown-item">
                            <FaList /> 
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="dropdown-item">
                            <FaConciergeBell /> 
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
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      <FaSignInAlt /> Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      <FaUser /> Register
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
