import useAccueil from "./useAccueil";

export default function FormFiltre() {
  const { name, category, searchProduit, resetSearch, setname, setcategory } =
    useAccueil();

  return (
    <div className="row justify-content-center justify-content-md-around justify-content-lg-center  text-center mb-5">
      <div className="col-md-8 mb-3">
        <div className="input-group">
          <input
            type="text"
            placeholder="Nom du produit"
            className="form-control"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <select
            className="form-select"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="">catégorie</option>
            <option value="accéssoire">accéssoire</option>
            <option value="vestimentaire">vestimentaire</option>
            <option value="éléctronique">éléctronique</option>
            <option value="appareil photographique">
              appareil photographique
            </option>
          </select>
        </div>
      </div>
      <div className="col-md-1 mb-3 me-md-3">
        <button
          onClick={searchProduit}
          className="btn btn-primary col-12 col-md-auto"
        >
          Search
        </button>
      </div>
      <div className="col-md-1">
        <button
          onClick={resetSearch}
          className="btn btnPurple col-12 col-md-auto"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
