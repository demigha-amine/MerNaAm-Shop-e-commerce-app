import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Accueil from "./pages/Accueil";
import Navbar from "./Components/Navbar";
import Panier from "./pages/Panier";
import Annonce from "./pages/Annonce";
import Commande from "./pages/Commande";
import DetailAnnonce from "./pages/DetailAnnonce";
import useInit from "./hooks/useInit";
import Spinner from "./Components/Spinner";
import ProtectedRoute from "./Components/ProtectedRoute";

export default function App() {
  const { isLoading } = useInit();
  if (isLoading) return <Spinner />;

  return (
    <Router>
      <Navbar />
      <div className="container pb-2">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/annonce/:id" element={<DetailAnnonce />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/annonce" element={<Annonce />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/commande" element={<Commande />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
