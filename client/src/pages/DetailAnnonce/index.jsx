import Spinner from "../../Components/Spinner";
import Error from "../../Components/Error";
import useDetail from "./useDetail";
import { imgFullPath } from "../../utils";

export default function DetailAnnonce() {
  const style = {
    input: {
      padding: " 0.375rem 0.75rem",
      border: "1px solid #ced4da",
      borderRadius: "0.25rem",
      transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
    },
  };

  const { addToPanier, annonce, loading, error, qteAchat, setqteAchat } =
    useDetail();

  console.log(annonce);
  return (
    <>
      {loading && <Spinner />}
      {error && <Error msg={error} />}
      {annonce && (
        <div className="card mb-3 h-100">
          <div className="row gx-3 gy-0">
            <div className="col-md-4">
              <img
                src={imgFullPath(annonce.photoAnnonce)}
                className="card-img-top img-display"
                alt="ImageProduit"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body h-100 col-lg-6 col-md-8 col-sm-12 d-flex flex-column justify-content-around">
                <div>
                  <h5 className="card-title fw-bold">{annonce.nomProduit}</h5>
                  <h5 className="card-title fw-bold text-danger">
                    {annonce.prix} $
                  </h5>
                  <h5 className="card-title">
                    Quantité Disponible: {annonce.qteDispo}
                  </h5>
                  <p className="card-text">{annonce.description}</p>
                </div>
                <div>
                  <div className="mb-3 mt-3">
                    <button
                      className="btn btn-danger me-2"
                      disabled={qteAchat <= 1}
                      onClick={() => setqteAchat((qteAchat) => qteAchat - 1)}
                    >
                      -
                    </button>

                    <div className="d-inline col-lg-6 col-4">
                      <input
                        type="number"
                        className="d-inline col-lg-6 col-4"
                        style={style.input}
                        value={qteAchat}
                        onChange={(e) => setqteAchat(e.target.value)}
                      />
                    </div>

                    <button
                      className="btn btn-success ms-2"
                      disabled={qteAchat >= annonce.qteDispo}
                      onClick={() => setqteAchat((qteAchat) => qteAchat + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn col-lg-8 col-md-8 col-12 btnTeal"
                    disabled={qteAchat > annonce.qteDispo || qteAchat < 1}
                    onClick={() => addToPanier(annonce._id)}
                  >
                    Acheter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
