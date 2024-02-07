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
      <section className="w-100 text-center ">
      
        <h3 style={{color:"#f27e4a",  fontWeight: "400", marginBottom:"4%"}}>Connectez vous </h3>
      </section>

      {isLoading && <Spinner />}

      {isError && <Error msg={isError} />}

      <section className="form" style={{marginBottom:"4%"}}>
        <form onSubmit={onSubmit}>
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

          <button type="submit" className="btn w-100 btn-secondary" style={{backgroundColor:"#f27e4a",marginTop:"6%",borderRadius:"10px"}}>
            Login
          </button>

          <p className="text-center text-muted mt-4 pb-3" style={{color:"#f27e4a"}}>
          Si vous n'avez pas encore de compte
            <Link to="/register" className="fw-bold text-body" style={{color:"#f27e4a"}}>
              <u> Inscrivez-vous !</u>
            </Link>
          </p>
        </form>
      </section>
    </>
  );
}

export default Login;
