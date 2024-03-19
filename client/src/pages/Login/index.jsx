import { Link } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import Error from "../../Components/Error";
import Input from "../../Components/Shared/Input";
import useLogin from "./useLogin";


function Login() {
  const { userInfo, errorInput, isLoading, isError, handleChange, onSubmit } =
    useLogin();

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 d-flex align-items-center justify-content-center"style={{    marginLeft: "-8%", width: "57%"}}>
            <img src="shopp.png" alt="Background" className="img-fluid"  />
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <section className="w-100">
              <h2 className="text-center" style={{color:"rgb(238 114 58 / 93%)"}}>
               Se Connecter
              </h2>

              {isLoading && <Spinner />}

              {isError && <Error msg={isError} />}

              <section className="form">
                <form onSubmit={onSubmit} style={{    marginTop: "40px",marginBottom: "-27px"
}}>
                  <Input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    label="Email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                    isError={errorInput.email}
                    
           />
                  <Input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    label="Password"
                    name="password"
                    value={userInfo.password}
                    onChange={handleChange}
                    isError={errorInput.password}
                  />

                  <button type="submit" className="btn w-50 btn-secondary" style={{    backgroundColor: "#ef7c48",borderColor: "#ef7c48", marginTop: "10%",
    marginLeft: "70px", color: "#2c2a52",fontWeight:"bold"}} >
                    Login
                  </button>

                  <p className="text-center text-muted mt-4 pb-3">
                   Vous n'avez pas encors un compte ?
                    <Link to="/register" className="fw-bold text-body" >
                      <u style={{ color: "#2c2a52",fontWeight:"bold"}}> Inscrivez-vous ici</u>
                    </Link>
                  </p>
                </form>
              </section>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
