import React from "react";
import Modal from "./Modal";

export default function Header() {
  return (
    <div>
      <section className="d-sm-flex justify-content-between align-items-center text-center">
        <h1 className="mb-3">
          <span  style={{color:"#e67f53"}}>Mes annonces</span>
        </h1>
        <Modal />
      </section>
    </div>
  );
}
