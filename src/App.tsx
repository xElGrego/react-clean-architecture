import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./presentation/pages/home/HomePage";
import { Navbar } from "./presentation/components/navbar/Navbar";
import { ProductsPage } from "./presentation/pages/products/ProductsPage";
import { PostPage } from "./presentation/pages/post/PostPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/post" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
