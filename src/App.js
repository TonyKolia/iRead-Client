import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import "./css/style.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home";
import Main from "./Components/Main";
import Basket from "./Components/Basket/Basket";
import BookPage from "./Components/Book/BookPage";
import Footer from "./Components/Footer";
import LoginModal from "./Components/LoginModal";
import OrderCompleted from "./Components/OrderCompleted";
import Register from "./Components/Register";
import Terms from "./Components/Terms";
import UserOrders from "./Components/UserOrders/UserOrders";
import Favorites from "./Components/Favorites/Favorites";


import Error from "./Components/Error";

export const UserContext = React.createContext();
export const BasketContext = React.createContext();

export const BASKET_ACTIONS = {
  ADD_ITEM: "add-item",
  DELETE_ITEM: "delete-item",
  CLEAR: "clear",
  INITIALIZE: "initialize"
}

function basketReducer(basket, action) {
  switch (action.type) {
    case BASKET_ACTIONS.INITIALIZE:
      return [...action.payload.items];
    case BASKET_ACTIONS.ADD_ITEM:
      return [...basket, action.payload.itemId];
      break;
    case BASKET_ACTIONS.DELETE_ITEM:
      return basket.filter(item => item != action.payload.itemId);
      break;
    case BASKET_ACTIONS.CLEAR:
      return [];
      break;
  }
}

export default function App() {

  const [basket, dispatchBasket] = React.useReducer(basketReducer, []);
  const [basketAddition, setBasketAddition] = React.useState({});
  const [user, setUser] = React.useState({
    userId: "",
    username: "",
    token: ""
  });

  React.useEffect(initializeBasket, []);
  React.useEffect(checkForLoggedUser, []);

  React.useEffect(() => {
    localStorage.setItem('basketItems', JSON.stringify(basket));
  }, [basket]);

  React.useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  function checkForLoggedUser() {
    let user = localStorage.getItem('user');
    if (user !== null) {
      user = JSON.parse(user);
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
    let basketItemsString = localStorage.getItem('basketItems');
    let basketItems = [];
    if (basketItemsString !== null)
      basketItems = JSON.parse(basketItemsString);
    dispatchBasket({ type: BASKET_ACTIONS.INITIALIZE, payload: { items: basketItems } });
  }

  function addItemToBasket(itemId) {
    /*
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
    */
  }

  function removeItemFromBasket(itemId) {
    /*
let currentItems = basket.items;
    currentItems.splice(currentItems.indexOf(itemId), 1);
    setBasket((prevBasket) => {
      return {
        ...prevBasket,
        items: currentItems
      }
    });
     */

  }
  /*   function clearBakset() {
    setBasket((prevBasket) => {
      return {
        ...prevBasket,
        items: []
      }
    });
  }*/



  return (
    <Router>
      <div>
        <UserContext.Provider value={user}>
          <BasketContext.Provider value={{ basket, dispatchBasket }}>
            <div className="container-fluid">
              <Navbar logoutUser={logoutUser} basketAddition={basketAddition} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<Main />} />
                <Route path="/basket" element={<Basket />} />
                <Route path="/book/:id" element={<BookPage />} />
                <Route path="/bookmarks" element={<Favorites />} />
                <Route path="/order-completed/:id" element={<OrderCompleted />} />
                <Route path="/register" element={<Register loginUser={loginUser} />} />
                <Route path="/orders" element={<UserOrders />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </div>
            <Footer />
            <LoginModal loginUser={loginUser} />
          </BasketContext.Provider>
        </UserContext.Provider>
      </div>
    </Router>
  );
}
