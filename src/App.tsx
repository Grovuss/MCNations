import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import Rules from "./pages/Rules";
import HowToJoin from "./pages/HowToJoin";
import AboutUs from "./pages/AboutUs";
import Donate from "./pages/Donate";

// Lazy-loaded so the Firebase SDK it pulls in only downloads for
// visitors who actually go to /admin, not for every page load.
const AdminPage = lazy(() => import("./pages/AdminPage"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/how-to-join" element={<HowToJoin />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="*" element={<Home />} />
        </Route>
        {/* Deliberately outside Layout — no public nav/footer, not linked
            from anywhere in the site. */}
        <Route
          path="/admin"
          element={
            <Suspense fallback={<div className="min-h-screen bg-ink-950" />}>
              <AdminPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
