import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
