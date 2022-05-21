import React from "react";
import "../../css/style.css";
import DropdownMenu from "./DropdownMenu";
import { BasketContext, UserContext } from "../../App";
import { NavbarContext } from "../../App";

export default function Navbar(props) {

    const basket = React.useContext(BasketContext);
    const user = React.useContext(UserContext);
    let alert = null;
    let cssClass = "";
    let alertText = "";/*
      if (Object.keys(props.basketAddition).length > 0) {
        cssClass = props.basketAddition.failed ? "alert-danger" : "alert-success";
        alertText = props.basketAddition.message;
        alert = <div className={`alert ${cssClass}`} role="alert">{alertText}</div>
    }

     */

    const navbar = React.useContext(NavbarContext);

    console.log(navbar);

    return (
        <nav className="navbar navbar-expand-lg navbar-fixed-top">
            <a onClick={() => navbar.setNavbarSelected(null)} className="navbar-brand" href="/">iRead</a>
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                <ul className="navbar-nav">
                    <li onClick={() => navbar.setNavbarSelected("books")} key="books" className={`nav-item fromLeft${navbar.navbarSelecteds == "books" ? "selected" : ""}`}>
                        <a className="nav-link" href="/books">Τα βιβλία</a>
                    </li>
                    <li key="library" className="nav-item fromLeft">
                        <a className="nav-link" href="/library">Η βιβλιοθήκη</a>
                    </li>
                    <li key="stuff" className="nav-item fromLeft">
                        <a className="nav-link" href="/stuff">Το προσωπικό</a>
                    </li>
                </ul>
            </div>
            <div style={{ width: "70%", display: "flex", justifyContent: "flex-end" }}>
                <ul className="navbar-nav">
                    <li key="login" className="nav-item fromLeft">
                        {user.user.userId !== "" ? <DropdownMenu /> :
                            <a className="nav-link" data-bs-toggle="modal" data-bs-target="#loginModal"><i className="fa-solid fa-right-to-bracket"></i>Σύνδεση</a>
                        }
                    </li>
                    <li key="basket">
                        <div className="cart nav-item fromLeft">
                            <a className="nav-link" href="/basket"><i className="fa-solid fa-basket-shopping"></i>Καλάθι</a>
                            <span className="badge">{basket.basket.length}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )

}