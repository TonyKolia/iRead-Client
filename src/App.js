import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import "./css/style.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Main from "./Components/Main";
import Basket from "./Components/Basket";
import BookPage from "./Components/BookPage";
import Footer from "./Components/Footer";
import LoginModal from "./Components/LoginModal";

import Error from "./Components/Error";

export default function App() {
  return (
    <Router>
      <div>
        <div className="container-fluid">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Main />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/book/:id" element={<BookPage />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        <Footer />
        <LoginModal />
      </div>
    </Router>


  );
}
