import React from "react";

export default function Carousel({ images, background }) {
  const carouselStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "900px", // Largeur du carousel
    height: "400px", // Hauteur du carousel
    margin: "0 auto", // Pour centrer horizontalement
  };

  return (
    <div className="carousel slide mb-5" style={carouselStyle} data-bs-ride="carousel">
      <div className="carousel-inner" style={{ height: "100%" }}>
        {images.map((image, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`} style={{ height: "100%" }}>
            <img src={image} className="d-block w-100" alt={`slide-${index}`} style={{ borderRadius: 0, height: "100%", objectFit: "cover" }} /> {/* Ajouter le style `borderRadius: 0` */}
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target=".carousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target=".carousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>

      <div className="carousel-indicators" style={{ bottom: "20px" }}>
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target=".carousel"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
