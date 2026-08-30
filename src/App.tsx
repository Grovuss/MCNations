import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import Rules from "./pages/Rules";
import HowToJoin from "./pages/HowToJoin";
import AboutUs from "./pages/AboutUs";
import Donate from "./pages/Donate";

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
      </Routes>
    </BrowserRouter>
  );
}
