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

  const [basket, setBasket] = React.useState({ userId: null, items: [] });

  const addItemToBasket = function (itemId) {
    //save to local storage to persist through reload
    if(basket.items.includes(itemId)){
      alert("this is not allowed")
      return;
    }

    let currentItems = basket.items;
    currentItems.push(itemId);
    setBasket((prevBasket) => {
      return {
        ...prevBasket,
        items: currentItems
      }
    });
  }

  return (
    <Router>
      <div>
        <div className="container-fluid">
          <Navbar numberOfItems={basket.items.length} />
          <Routes>
            <Route path="/" element={<Home addItemToBasket={addItemToBasket} />} />
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
