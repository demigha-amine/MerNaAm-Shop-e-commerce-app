import Spinner from "../../Components/Spinner";
import Card from "./Card";
import FormFiltre from "./FormFiltre";
import Pagination from "./Pagination";
import Carousel from "./Carousel";
import useAccueil from "./useAccueil";

export default function Dashboard() {
  const { annonces, isLoading } = useAccueil();
  const images = [
    "https://cdn.pixabay.com/photo/2018/05/16/18/08/e-commerce-3406613_640.jpg",
    "https://cdn.pixabay.com/photo/2019/02/10/15/09/clothes-3987460_640.jpg",
    "https://cdn.pixabay.com/photo/2018/09/17/22/26/headphone-3684963_640.jpg",
    "https://cdn.pixabay.com/photo/2023/04/26/17/59/wrist-watch-7953062_640.jpg"
    
  ];
  return (
    <>
      {isLoading && <Spinner />}
      <Carousel images={images} />
      <FormFiltre />
      <div className="row gx-md-5 gy-5 pb-5">
        {annonces.map((annonce) => {
          return <Card key={annonce._id} annonce={annonce} />;
        })}
      </div>

      <Pagination />
    </>
  );
}
