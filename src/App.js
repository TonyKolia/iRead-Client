import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import Helpers from "./Helpers/Helpers";
import NotFound from "./Components/NotFound";
import UserNotifications from "./Components/Notifications/UserNotifications";
import API from "./Helpers/API";
import AccountActivation from "./Components/AccountActivation";
import EmailForm from "./Components/PasswordReset/EmailForm";
import NewPasswordForm from "./Components/PasswordReset/NewPasswordForm";

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


const scrollFunction = () => {
  if (document.body.scrollTop > 110 || document.documentElement.scrollTop > 110) {
    document.getElementById("logo").style.width = "90px";
    document.getElementById("navItems").style.width = "100%";
    document.getElementById("container").style.paddingTop = "70px";
  }
  else {
    document.getElementById("logo").style.width = "";
    document.getElementById("navItems").style.width = "90%";
    document.getElementById("container").style.paddingTop = "110px";
  }
}



export default function App() {

  React.useEffect(() => {

    window.addEventListener("scroll", scrollFunction);

    return () => { window.removeEventListener("scroll"); };

  }, [])

  const addItemToCart = (basket, item) => {
    if (basket.current.includes(item)) {
      return Helpers.errorMessage("Το βιβλίο υπάρχει ήδη στο καλάθι.");
    }
    else if (basket.current.length == 3) {
      return Helpers.errorMessage("Μπορείτε να έχετε μέχρι 3 βιβλία στο καλάθι.");
    }
    else {
      Helpers.successMessage("Προστέθηκε στο καλάθι!");
      return basket.current = [...basket.current, item];
    }
  }

  const removeItemFromCart = (basket, itemId) => {
    Helpers.successMessage("Αφαιρέθηκε επιτυχώς!");
    return basket.current = basket.current.filter(item => item != itemId);
  }

  const userReducer = (user, action) => {
    switch (action.type) {
      case USER_ACTIONS.LOGIN:
        //checkForUserNotifications(action.payload.user.userId, action.payload.user.token);
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

  const basket = React.useRef([]);

  const manageBasket = (action) => {
    switch (action.type) {
      case BASKET_ACTIONS.INITIALIZE:
        basket.current = [...action.payload.items];
        break;
      case BASKET_ACTIONS.ADD_ITEM:
        addItemToCart(basket, action.payload.itemId);
        localStorage.setItem('basketItems', JSON.stringify(basket.current));
        break;
      case BASKET_ACTIONS.DELETE_ITEM:
        removeItemFromCart(basket, action.payload.itemId);
        localStorage.setItem('basketItems', JSON.stringify(basket.current));
        break;
      case BASKET_ACTIONS.CLEAR:
        basket.current = [];
        localStorage.setItem('basketItems', JSON.stringify(basket.current));
        break;
      default:
        break;
    }

    var basketCounter = document.getElementById("basket-counter");
    if (basketCounter !== null && basketCounter !== undefined)
      basketCounter.innerText = basket.current.length;

  }

  const checkForLoggedUser = () => {
    let user = localStorage.getItem('user');
    if (user !== null)
      user = JSON.parse(user);
    dispatchUser({ type: USER_ACTIONS.LOGIN, payload: { user: user } });
  }

  const [user, dispatchUser] = React.useReducer(userReducer, { userId: "", username: "", token: "" });

  const initializeBasket = () => {
    let basketItemsString = localStorage.getItem('basketItems');
    let basketItems = [];
    if (basketItemsString !== null)
      basketItems = JSON.parse(basketItemsString);
    manageBasket({ type: BASKET_ACTIONS.INITIALIZE, payload: { items: basketItems } });
  }

  React.useEffect(initializeBasket, []);
  React.useEffect(checkForLoggedUser, []);

  React.useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <Router>
      <ToastContainer />
      <div>
        <UserContext.Provider value={{ user, dispatchUser }}>
          <BasketContext.Provider value={{ basket, manageBasket }}>
            <div className="container-fluid" id="container">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<Main />} />
                <Route path="/books/:type" element={<Main />} />
                <Route path="/basket" element={<Basket basketItemIds={basket.current} />} />
                <Route path="/book/:id" element={<BookPage />} />
                <Route path="/bookmarks" element={<Favorites />} />
                <Route path="/order-completed/:id" element={<OrderCompleted />} />
                <Route path="/register" element={<Register />} />
                <Route path="/orders" element={<UserOrders />} />
                <Route path="/notifications" element={<UserNotifications />} />
                <Route path="/accountActivation/userId/:userId/token/:token" element={<AccountActivation />} />
                <Route path="/passwordReset" element={<EmailForm />} />
                <Route path="/passwordReset/userId/:userId/token/:token" element={<NewPasswordForm />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/error" element={<Error />} />
                <Route path="*" element={<NotFound />} />
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
