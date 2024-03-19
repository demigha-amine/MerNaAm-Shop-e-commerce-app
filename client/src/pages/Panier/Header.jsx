import Error from "../../Components/Error";
import usePanier from "./usePanier";

export default function Header() {
  const { isError, total, checkout } = usePanier();

  return (
    <>
      
      <section className="bg-light p-4">
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div>
            <h2 className="mb-0" style={{color:"#e67f53"}}>Total: {total}€</h2>
          </div>
          <div>
            <button className="btn btn-primary" onClick={checkout}>
              Payer maintenant
            </button>
          </div>
        </div>
      </section>
      {isError && <Error msg={isError} />}
    </>
  );
}
