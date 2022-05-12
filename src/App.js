import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import "./css/style.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Main from "./Components/Main";
import Basket from "./Components/Basket/Basket";
import BookPage from "./Components/BookPage";
import Footer from "./Components/Footer";
import LoginModal from "./Components/LoginModal";

import Error from "./Components/Error";

export default function App() {

  const [basket, setBasket] = React.useState({ userId: null, items: [] });
  const [basketAddition, setBasketAddition] = React.useState({});
  const [user, setUser] = React.useState({
    userId: "",
    username: "",
    token: ""
  });

  console.log(user);

  React.useEffect(initializeBasket, []);
  React.useEffect(checkForLoggedUser, []);

  React.useEffect(() => {
    localStorage.setItem('basketItems', JSON.stringify(basket.items));
  }, [basket]);

  React.useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  function checkForLoggedUser() {
    var user = localStorage.getItem('user');
    if (user !== null) {
      var user = JSON.parse(user);
      setUser(user);
    }
  }

  function loginUser(user) {
    setUser({
      userId: user.userId,
      username: user.username,
      token: user.token
    });
  }

  function logoutUser() {
    setUser({
      userId: "",
      username: "",
      token: ""
    });
    localStorage.removeItem('user');
  }

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
      setBasketAddition({
        failed: true,
        message: "Το συγκεκριμένο βιβλίο υπάρχει ήδη στο καλάθι."
      });
    }
    else {
      let currentItems = basket.items;
      currentItems.push(itemId);
      setBasket((prevBasket) => {
        return {
          ...prevBasket,
          items: currentItems
        }
      });
      setBasketAddition({
        failed: false,
        message: "Προστέθηκε στο καλάθι!"
      });
    }
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
          <Navbar user={user} numberOfItems={basket.items.length} basketAddition={basketAddition} />
          <Routes>
            <Route path="/" element={<Home addItemToBasket={addItemToBasket} />} />
            <Route path="/books" element={<Main />} />
            <Route path="/basket" element={<Basket basketItems={basket.items} removeItemFromBasket={removeItemFromBasket} clearBasket={clearBakset} user={user} />} />
            <Route path="/book/:id" element={<BookPage addItemToBasket={addItemToBasket} />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        <Footer />
        <LoginModal loginUser={loginUser} />
      </div>
    </Router>
  );
}
