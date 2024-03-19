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
      <section className="w-100 text-center"style={{color:"rgb(238 114 58 / 93%)"}}>
        <h1>
         Inscription
        </h1>
      </section>

      {loading && <Spinner />}
      {error && <Error msg={error} />}

      <section>
        <form onSubmit={onSubmit} className="form"  style={{    marginTop: "20px",marginBottom: "-27px"
}}>
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
          <button type="submit" className="btn w-50 btn-secondary"  style={{    backgroundColor: "#ef7c48",borderColor: "#ef7c48", marginTop: "10%",
    marginLeft: "70px", color: "#2c2a52",fontWeight:"bold"}}>
            Register
          </button>
          <p className="text-center text-muted mt-4 pb-4" style={{width: "107%",
    marginLeft: "-20px"}}>
            Avez-vous déja un compte?
            <Link to="/login" className="fw-bold text-body">
              <u style={{ color: "#2c2a52",fontWeight:"bold"}}> Connectez-vous !</u>
            </Link>
          </p>
        </form>
      </section>
    </>
  );
}

export default Register;
