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

  React.useEffect(initializeBasket, [])

  React.useEffect(() => {
    localStorage.setItem('basketItems', JSON.stringify(basket.items));
  }, [basket]);

  function initializeBasket() {
    var basketItemsString = localStorage.getItem('basketItems');
    if (basketItemsString !== null)
      var basketItems = JSON.parse(basketItemsString);

    setBasket((prevBasket) => {
      return {
        ...prevBasket,
        items: basketItems
      };
    });
  }

  function addItemToBasket(itemId) {

    if (basket.items.includes(itemId)) {
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

  function removeItemFromBasket(itemId) {
    let currentItems = basket.items;
    currentItems.splice(currentItems.indexOf(itemId), 1);
    setBasket((prevBasket) => {
      return {
        ...prevBasket,
        items: currentItems
      }
    });
  }

  function clearBakset() {
    setBasket((prevBasket) => {
      return {
        ...prevBasket,
        items: []
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
            <Route path="/basket" element={<Basket basketItems={basket.items} removeItemFromBasket={removeItemFromBasket} clearBasket={clearBakset} />} />
            <Route path="/book/:id" element={<BookPage addItemToBasket={addItemToBasket} />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        <Footer />
        <LoginModal />
      </div>
    </Router>


  );
}
