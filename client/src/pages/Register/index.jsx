import { Link } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import Input from "../../Components/Shared/Input";
import Error from "../../Components/Error";
import useRegister from "./useRegister";

function Register() {
  const { userInfo, errorInput, loading, error, onSubmit, handleChange } =
    useRegister();

  return (
    <>
      <section className="w-100 text-center">
       
      <h3 style={{color:"#f27e4a",  fontWeight: "400", marginBottom:"4%"}}>Inscrivez vous pour une meilleure experience   </h3>

      </section>

      {loading && <Spinner />}
      {error && <Error msg={error} />}

      <section>
        <form onSubmit={onSubmit} className="form">
          <Input
            type="text"
            className="form-control"
            placeholder="Your fullname"
            label="Fullname"
            name="fullname"
            value={userInfo.fullname}
            onChange={handleChange}
            isError={errorInput.fullname}
          />
          <Input
            type="email"
            className="form-control"
            placeholder="Your email"
            label="Email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            isError={errorInput.email}
          />
          <Input
            type="password"
            className="form-control"
            placeholder="Password"
            label="Password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            isError={errorInput.password}
          />
          <Input
            type="password"
            className="form-control"
            placeholder="Confirm your password"
            label="Confirm Password"
            name="confirmPassword"
            value={userInfo.confirmPassword}
            onChange={handleChange}
            isError={errorInput.confirmPassword}
          />
          <button type="submit" className="btn w-100 btn-secondary" style={{backgroundColor:"#f27e4a",marginTop:"6%",borderRadius:"10px"}}>
            Register
          </button>
          <p className="text-center text-muted mt-4 pb-3">
            Have already an account?
            <Link to="/login" className="fw-bold text-body">
              <u> Login here</u>
            </Link>
          </p>
        </form>
      </section>
    </>
  );
}

export default Register;
