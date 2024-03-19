import React from "react";
import useCommande from "./useCommande";

export default function CardAnnonce({ commande }) {
  const { rembourser } = useCommande();

  const style = {
    card: { height: "370px" },
  };

  return (
    <div className="col-lg-4 col-sm-6 col-12">
      <div className="card" style={style.card}>
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title title">Commande :</h5>
            {commande.orderItems.map((annonce) => {
              return (
                <div key={annonce._id}>
                  <h5 className="card-subtitle text-muted title">
                    - {annonce.annonce.nomProduit} ({annonce.annonce.prix} €) x
                    {annonce.qteAchat}
                  </h5>
                </div>
              );
            })}
            <h5
              className={`card-title fw-bold ${
                commande.status === "success" ? "text-success" : "text-danger"
              }`}
            >
              - Status: {commande.status}
            </h5>
          </div>

          <div>
            <h5 className="card-title fw-bold text-info text-end">
              Total: {commande.totalPrice / 100} €
            </h5>
            <button
              className="btn w-100 btn-danger"
              disabled={commande.status === "refunded"}
              onClick={() => rembourser(commande.payment_intent)}
            >
              rembourser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
