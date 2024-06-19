import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import Dashboard from "./components/Dashboard/Dashboard";
import CategoryList from "./components/Categories/CategoryList";
import CarList from "./components/Cars/CarList";
import PrivateRoute from "./components/PrivateRoute";

const NotFound = () => {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for could not be found.</p>
    </>
  );
};

const MainRoutes = () => (
  <Router>

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/cars" element={<CarList />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

  </Router>
);

export default MainRoutes;