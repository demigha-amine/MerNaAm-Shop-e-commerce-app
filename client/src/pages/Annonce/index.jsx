import Header from "./Header";
import useAnnonce from "./useAnnonce";
import Card from "./Card";

export default function Annonce() {
  const { listAnnonce } = useAnnonce();

  return (
    <div>
      <Header />
      <div className="row mt-3 gy-5 pb-5">
        {listAnnonce.length === 0 ? (
          <h3 className="text-center p-5 border-top"color="#2b2931">
            Créer votre premiere annonce !
          </h3>
        ) : (
          listAnnonce.map((annonce) => {
            return <Card key={annonce._id} annonce={annonce} />;
          })
        )}
      </div>
    </div>
  );
}
