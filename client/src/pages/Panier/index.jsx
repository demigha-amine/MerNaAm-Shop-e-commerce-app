import Spinner from "../../Components/Spinner";
import Card from "./Card";
import Header from "./Header";
import usePanier from "./usePanier";
import { FaShoppingCart } from "react-icons/fa";


export default function Panier() {
  const { isLoading, listPanier } = usePanier();
  return (
    <div className="container bg-light p-4"> 
      <section>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <FaShoppingCart size={30} color="#e67f53"  />
          </div>
          <h1 className="mb-0" style={{color:"#e67f53"}}>Votre panier</h1>
        </div>
        <hr className="my-4" /> {/* Ajout d'une marge en haut et en bas */}
      </section>
      {isLoading && <Spinner />}
      <div className="row mt-2 gy-5 pb-5">
        {listPanier.length === 0 ? (
          <h3 className="text-center p-5 border-top">Votre panier est vide</h3>
        ) : (
          listPanier.map((annonce) => {
            return <Card key={annonce._id} annonce={annonce} />;
          })
        )}
      </div>
      <Header /> {/* Le composant Header héritera du style de la page */}
    </div>
  );
}
