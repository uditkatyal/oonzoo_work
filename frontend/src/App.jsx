import { useState } from "react";
import RegisterScreen from "./screens/registerScreen";
import ProductScreen from "./screens/ProductScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterScreen />} />
          <Route path="/products" element={<ProductScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
