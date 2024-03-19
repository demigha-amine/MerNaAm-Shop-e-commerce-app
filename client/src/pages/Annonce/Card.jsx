import React from "react";
import Spinner from "../../Components/Spinner";
import useAnnonce from "./useAnnonce";
import { imgFullPath } from "../../utils";

export default function Card({ annonce }) {
  const { setForm, deleteAnnonce, isLoading } = useAnnonce();

  return (
    <>
      {isLoading && <Spinner />}
      <div className="col-md-12 col-sm-6 col-12">
        <div className="card h-100 ">
          <div className="row gx-3 gy-0">
            <div className="col-md-4">
              <img
                src={imgFullPath(annonce.photoAnnonce)}
                className="img-fluid rounded-start w-100 h-100 img-display"
                alt="ImageProduit"
              />
            </div>
            <div className="col-md-7">
              <div className="card-body h-100 col-lg-8 d-flex flex-column justify-content-around">
                <div>
                  <h5 className="card-title fw-bold title">
                    {annonce.nomProduit}
                  </h5>
                  <h5 className="card-title fw-bold text-danger">
                    {annonce.prix} $
                  </h5>
                  <p className="card-title">
                    Quantité Disponible: {annonce.qteDispo}
                  </p>
                  <p className="card-text description">{annonce.description}</p>
                </div>

                <button
                  className="btn w-100 mt-3 btnTeal"
                  data-bs-toggle="modal"
                  data-bs-target=".modal"
                  onClick={() => setForm(annonce)}
                >
                  Update Annonce
                </button>
                <button
                  className="btn d-md-none btn-danger mt-3 w-100"
                  onClick={() => deleteAnnonce(annonce._id)}
                >
                  Delete Annonce
                </button>
              </div>
            </div>
            <div className="mt-3 pe-4 d-none d-md-flex col-md-1 d-flex flex-column align-items-end">
              <button
                className="btn btn-danger me-2"
                onClick={() => deleteAnnonce(annonce._id)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
