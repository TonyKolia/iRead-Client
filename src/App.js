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
import Alert from "./Components/Alert";


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

export const ALERT_TYPES = {
  SUCCESS: "success",
  FAIL: "fail"
}

export default function App() {

  const [alert, setAlert] = React.useState(null);

  const addItemToCart = (basket, item) => {
    if (basket.includes(item)) {
      setAlert({ type: ALERT_TYPES.FAIL, text: "Το συγκεκριμένο βιβλίο υπάρχει ήδη στο καλάθι." });
      return basket;
    }
    else if (basket.length == 3) {
      setAlert({ type: ALERT_TYPES.FAIL, text: "Μπορείτε να έχετε μέχρι 3 βιβλία στο καλάθι." });
      return basket;
    }
    else {
      setAlert({ type: ALERT_TYPES.SUCCESS, text: "Προστέθηκε στο καλάθι!" });
      return [...basket, item];
    }
  }

  const removeItemFromCart = (basket, itemId) => {
    setAlert({ type: ALERT_TYPES.SUCCESS, text: "Αφαιρέθηκε επιτυχώς!" });
    return basket.filter(item => item != itemId);
  }

  const userReducer = (user, action) => {
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

  const basketReducer = (basket, action) => {
    switch (action.type) {
      case BASKET_ACTIONS.INITIALIZE:
        return [...action.payload.items];
      case BASKET_ACTIONS.ADD_ITEM:
        return addItemToCart(basket, action.payload.itemId);
        break;
      case BASKET_ACTIONS.DELETE_ITEM:
        return removeItemFromCart(basket, action.payload.itemId);
        break;
      case BASKET_ACTIONS.CLEAR:
        return [];
        break;
      default:
        return basket;
        break;
    }
  }

  const checkForLoggedUser = () => {
    let user = localStorage.getItem('user');
    if (user !== null)
      user = JSON.parse(user);
    dispatchUser({ type: USER_ACTIONS.LOGIN, payload: { user: user } });
  }

  const [basket, dispatchBasket] = React.useReducer(basketReducer, []);
  const [user, dispatchUser] = React.useReducer(userReducer, { userId: "", username: "", token: "" });

  const initializeBasket = () => {
    let basketItemsString = localStorage.getItem('basketItems');
    let basketItems = [];
    if (basketItemsString !== null)
      basketItems = JSON.parse(basketItemsString);
    dispatchBasket({ type: BASKET_ACTIONS.INITIALIZE, payload: { items: basketItems } });
  }

  React.useEffect(initializeBasket, []);
  React.useEffect(checkForLoggedUser, []);

  React.useEffect(() => {
    localStorage.setItem('basketItems', JSON.stringify(basket));
  }, [basket]);

  React.useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <Router>
      <div>
        <UserContext.Provider value={{ user, dispatchUser }}>
          <BasketContext.Provider value={{ basket, dispatchBasket }}>
            <div className="container-fluid">
              <Navbar />
              {alert != null && <Alert alert={alert} fromTimeout={false} />}
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
