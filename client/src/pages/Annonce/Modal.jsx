import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import Input from "../../Components/Shared/Input";
import Select from "../../Components/Shared/Select";
import useAnnonce from "./useAnnonce";
import Spinner from "../../Components/Spinner";

export default function Modal() {
  const {
    formAnnonce,
    submitModal,
    errorInput,
    handleChange,
    selectOptions,
    closeModal,
    resetModal,
    isLoading,
  } = useAnnonce();

  return (
    <div>
      {isLoading && <Spinner />}
      <button
        className="btn btnTeal"
        data-bs-toggle="modal"
        data-bs-target=".modal"
        style={{    backgroundColor: "#959fb5"}}
      >
        <FaPlusCircle /> Nouvelle annonce
      </button>
      <div
        className="modal fade text-start"
        data-bs-keyboard="false"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Créer une annonce</h5>
            <button
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={resetModal}
              ref={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <Input
                type="text"
                className="form-control"
                placeholder="Nom du Produit"
                label="Nom du produit"
                name="nomProduit"
                value={formAnnonce.nomProduit}
                onChange={handleChange}
                isError={errorInput.nomProduit}
              />
              <Select
                label="Catégorie"
                name="categorie"
                value={formAnnonce.categorie}
                onChange={handleChange}
                selectOptions={selectOptions}
                isError={errorInput.categorie}
              />
              <Input
                type="number"
                className="form-control"
                placeholder="Prix du Produit"
                label="Prix du produit"
                name="prix"
                value={formAnnonce.prix}
                onChange={handleChange}
                isError={errorInput.prix}
              />
              <Input
                type="text"
                className="form-control"
                placeholder="Description du Produit"
                label="Description du produit"
                name="description"
                value={formAnnonce.description}
                onChange={handleChange}
                isError={errorInput.description}
              />

              <Input
                type="number"
                className="form-control"
                placeholder="Quantité disponible"
                label="Quantité disponible"
                name="qteDispo"
                value={formAnnonce.qteDispo}
                onChange={handleChange}
                isError={errorInput.qteDispo}
              />

              <Input
                type="file"
                className="form-control"
                placeholder="Photo du produit"
                label="Photo du produit"
                name="file"
                onChange={handleChange}
                isError={errorInput.file}
              />
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={resetModal}
            >
              Close
            </button>
            <button
              onClick={submitModal}
              className={`btn ${formAnnonce._id ? "btnPurple" : "btnTeal"}`}
            >
              {formAnnonce._id ? "Update" : "Créer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
