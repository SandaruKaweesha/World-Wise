import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Homepage from "./pages/Homepage.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";

const BASEURL = "http://localhost:9000";

function App() {
  const [cities, setCities] = useState([]);
  const [laoding, setLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setLoading(true);
        const res = await fetch(`${BASEURL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        alert("Error fetching cities data: " + error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCities()
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route index element={<Homepage />} /> */}
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          {/* Nested routes for the app */}
          <Route path="app" element={<AppLayout />}>
            <Route index element={<CityList cities={cities} isloading={laoding} />} />
            <Route path="cities" element={<p>List of cities</p>} />
            <Route path="countries" element={<p>List of countries</p>} />
            <Route path="form" element={<p>List of forms</p>} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
          <Route />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
