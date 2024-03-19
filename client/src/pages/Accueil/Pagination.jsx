import React from "react";
import useAccueil from "./useAccueil";

export default function Pagination() {
  const { filtre, nbrPages, updatePage } = useAccueil();

  return (
    <nav>
      <ul className="pagination pagination-lg col-12 justify-content-end">
        {[...Array(nbrPages)].map((x, i) => (
          <li
            className={`page-item me-3 ${
              filtre.page === i + 1 ? "active" : ""
            }`}
            key={i}
          >
            <button className="btn page-link" onClick={() => updatePage(i)}>
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
