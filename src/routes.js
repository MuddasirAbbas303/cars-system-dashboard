import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import CategoryList from "./components/Categories/CategoryList";
import CarList from "./components/Cars/CarList";
import PrivateRoute from "./components/PrivateRoute";
import Notfound from "./components/Notfound";

const MainRoutes = () => (
  <Router>

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/cars" element={<CarList />} />
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>

  </Router>
);

export default MainRoutes;