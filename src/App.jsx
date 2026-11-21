import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Homepage from "./pages/Homepage.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";

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
            <Route index element={<Navigate replace to="cities"/>} />
            <Route path="cities" element={<CityList cities={cities} isloading={laoding} />} />
              <Route path="cities/:id" element={<City/>}/>
            <Route path="countries" element={<CountryList cities={cities} isloading={laoding} />} />
            <Route path="form" element={<Form/>} />
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
