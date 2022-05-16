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

export const USER_ACTIONS = {
  LOGIN: "login",
  LOGOUT: "logout"
}

function userReducer(user, action) {
  switch (action.type) {
    case USER_ACTIONS.LOGIN:
      return { userId: action.payload.user.userId, username: action.payload.user.username, token: action.payload.user.token };
      break;
    case USER_ACTIONS.LOGOUT:
      return { userId: "", username: "", token: "" };
      break;
    default:
      return user;
      break;
  }
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
    default:
      return basket;
      break;
  }
}

export default function App() {

  const [basket, dispatchBasket] = React.useReducer(basketReducer, []);
  const [user, dispatchUser] = React.useReducer(userReducer, { userId: "", username: "", token: "" });
  const [basketAddition, setBasketAddition] = React.useState({});

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
    if (user !== null)
      user = JSON.parse(user);
    dispatchUser({type: USER_ACTIONS.LOGIN, payload: {user: user} });
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
        <UserContext.Provider value={{user, dispatchUser}}>
          <BasketContext.Provider value={{ basket, dispatchBasket }}>
            <div className="container-fluid">
              <Navbar basketAddition={basketAddition} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<Main />} />
                <Route path="/basket" element={<Basket />} />
                <Route path="/book/:id" element={<BookPage />} />
                <Route path="/bookmarks" element={<Favorites />} />
                <Route path="/order-completed/:id" element={<OrderCompleted />} />
                <Route path="/register" element={<Register />} />
                <Route path="/orders" element={<UserOrders />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </div>
            <Footer />
            <LoginModal />
          </BasketContext.Provider>
        </UserContext.Provider>
      </div>
    </Router>
  );
}
