import React from "react";
import usePanier from "./usePanier";
import { imgFullPath } from "../../utils";

export default function Card({ annonce }) {
  const { deleteFromPanier, updateInPanier } = usePanier();

  return (
    <>
      <div className="col-md-12 col-sm-6 col-12">
        <div className="card h-100">
          <div className="row gx-3 gy-3">
            <div className="col-md-4">
              <img
                src={imgFullPath(annonce.annonce.photoAnnonce)}
                className="img-fluid rounded-start w-100 h-100 img-display"
                alt="ImageProduit"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body d-flex flex-column justify-content-between h-100">
                <div>
                  <h5 className="card-title fw-bold title">
                    {annonce.annonce.nomProduit}
                  </h5>
                  <h5 className="card-title fw-bold text-danger">
                    {annonce.annonce.prix} $
                  </h5>
                  <p className="card-text">
                    Quantité Disponible: {annonce.annonce.qteDispo}
                  </p>
                  <p className="card-text">
                    Quantité Voulu: {annonce.qteAchat}
                  </p>
                  <p className="card-text description">
                    {annonce.annonce.description}
                  </p>
                </div>

                <div
                  className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3"
                  style={{ width: "58%", marginLeft: "37%" }}
                >
                  <button
                    className="btn btn-primary w-39 mb-2 mb-md-0"
                    onClick={() =>
                      updateInPanier(`/annonce/${annonce.annonce._id}`)
                    }
                  >
                    Update Annonce
                  </button>
                  <button
                    className="btn btn-danger w-39%"
                    onClick={() => deleteFromPanier(annonce._id)}
                  >
                    Delete Annonce
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
