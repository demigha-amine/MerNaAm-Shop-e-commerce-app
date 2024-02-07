import Spinner from "../../Components/Spinner";
import FormFiltre from "./FormFiltre";
import useAccueil from "./useAccueil";

export default function Dashboard() {
const { isLoading } = useAccueil();

  return (
    <>
      {isLoading && <Spinner />}
      <FormFiltre />
      <div className="row gx-md-5 gy-5 pb-5">
      </div>

    </>
  );
}
