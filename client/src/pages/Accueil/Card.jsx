import React from "react";
import { useNavigate } from "react-router-dom";
import { imgFullPath } from "../../utils";

export default function CardAnnonce({ annonce }) {
  const navigate = useNavigate();
  return (
    <div className="col-lg-4 col-sm-6 col-12">
      <div className="card">
        <img
          src={imgFullPath(annonce.photoAnnonce)}
          className="card-img-top img-display"
          alt="ImageProduit"
        />
        <div className="card-body">
          <h5 className="card-title title">{annonce.nomProduit}</h5>
          <h5 className="card-title fw-bold text-danger">{annonce.prix} $</h5>
          <p className="card-text description">{annonce.description}</p>
          <div className="d-flex justify-content-center">
            <button
              className="btn w-100 btnTeal"
              onClick={() => navigate(`/annonce/${annonce._id}`)}
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
