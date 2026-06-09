import React from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import Product from "./components/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add_product" element={<AddProduct />} />   
          <Route path="/edit_product/:id" element={<UpdateProduct />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
